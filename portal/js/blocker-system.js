// Transaction Blocker Detection and Management System

class TransactionBlockerSystem {
  constructor() {
    this.blockerTypes = {
      BUYER_ACTION: 'buyer_action',
      DEVELOPER_ACTION: 'developer_action',
      SOLICITOR_ACTION: 'solicitor_action',
      MORTGAGE_PROVIDER: 'mortgage_provider',
      EXTERNAL_AUTHORITY: 'external_authority',
      SYSTEM_PROCESSING: 'system_processing'
    };

    this.blockerPriorities = {
      CRITICAL: 'critical',
      HIGH: 'high',
      MEDIUM: 'medium',
      LOW: 'low'
    };
  }

  // Main function to detect blockers for a transaction
  detectTransactionBlockers(transaction) {
    const blockers = [];
    
    // Check document blockers
    const documentBlockers = this.checkDocumentBlockers(transaction);
    blockers.push(...documentBlockers);
    
    // Check timeline blockers
    const timelineBlockers = this.checkTimelineBlockers(transaction);
    blockers.push(...timelineBlockers);
    
    // Check system blockers
    const systemBlockers = this.checkSystemBlockers(transaction);
    blockers.push(...systemBlockers);
    
    // Sort by priority
    return this.prioritizeBlockers(blockers);
  }

  checkDocumentBlockers(transaction) {
    const blockers = [];
    
    if (transaction.documents) {
      transaction.documents.forEach(doc => {
        if (doc.status === 'action_required') {
          blockers.push({
            id: `doc_${doc.id}`,
            type: this.blockerTypes.BUYER_ACTION,
            priority: this.blockerPriorities.HIGH,
            title: `Missing Document: ${doc.name}`,
            description: `The ${doc.name} document is required to proceed`,
            responsibleParty: 'Buyer',
            actionRequired: 'Upload document',
            daysBlocked: this.calculateDaysBlocked(doc.dueDate),
            category: 'documentation'
          });
        } else if (doc.status === 'under_review') {
          blockers.push({
            id: `doc_review_${doc.id}`,
            type: this.blockerTypes.SOLICITOR_ACTION,
            priority: this.blockerPriorities.MEDIUM,
            title: `Document Under Review: ${doc.name}`,
            description: `Awaiting solicitor review of ${doc.name}`,
            responsibleParty: 'Solicitor',
            actionRequired: 'Complete document review',
            daysBlocked: this.calculateDaysBlocked(doc.uploadDate),
            category: 'review'
          });
        }
      });
    }
    
    return blockers;
  }

  checkTimelineBlockers(transaction) {
    const blockers = [];
    
    if (transaction.timeline) {
      const currentStep = transaction.timeline.find(step => 
        step.status === 'action_required' || step.status === 'in_progress'
      );
      
      if (currentStep) {
        const blocker = this.mapTimelineStepToBlocker(currentStep, transaction);
        if (blocker) {
          blockers.push(blocker);
        }
      }
      
      // Check for overdue steps
      const overdueSteps = transaction.timeline.filter(step => 
        step.status === 'pending' && new Date(step.date) < new Date()
      );
      
      overdueSteps.forEach(step => {
        blockers.push({
          id: `overdue_${step.stage.toLowerCase().replace(/\s+/g, '_')}`,
          type: this.getResponsiblePartyType(step.stage),
          priority: this.blockerPriorities.CRITICAL,
          title: `Overdue: ${step.stage}`,
          description: `${step.stage} was due on ${this.formatDate(step.date)}`,
          responsibleParty: this.getResponsibleParty(step.stage),
          actionRequired: `Complete ${step.stage}`,
          daysBlocked: this.calculateDaysOverdue(step.date),
          category: 'timeline'
        });
      });
    }
    
    return blockers;
  }
  checkSystemBlockers(transaction) {
    const blockers = [];
    
    // Check blockchain verification
    if (!transaction.blockchain || !transaction.blockchain.verified) {
      blockers.push({
        id: 'blockchain_verification',
        type: this.blockerTypes.SYSTEM_PROCESSING,
        priority: this.blockerPriorities.LOW,
        title: 'Blockchain Verification Pending',
        description: 'Waiting for blockchain verification to complete',
        responsibleParty: 'System',
        actionRequired: 'Automated process - no action required',
        daysBlocked: 0,
        category: 'system'
      });
    }
    
    // Check for missing essential information
    if (!transaction.buyerName || transaction.buyerName.trim() === '') {
      blockers.push({
        id: 'missing_buyer_info',
        type: this.blockerTypes.BUYER_ACTION,
        priority: this.blockerPriorities.HIGH,
        title: 'Missing Buyer Information',
        description: 'Buyer details are incomplete',
        responsibleParty: 'Buyer',
        actionRequired: 'Complete buyer profile',
        daysBlocked: this.calculateDaysBlocked(transaction.createdDate),
        category: 'information'
      });
    }
    
    return blockers;
  }

  mapTimelineStepToBlocker(step, transaction) {
    const stepMappings = {
      'Survey Ordered': {
        type: this.blockerTypes.BUYER_ACTION,
        party: 'Buyer',
        action: 'Arrange property survey'
      },
      'Mortgage Application': {
        type: this.blockerTypes.MORTGAGE_PROVIDER,
        party: 'Mortgage Provider',
        action: 'Process mortgage application'
      },
      'Legal Review': {
        type: this.blockerTypes.SOLICITOR_ACTION,
        party: 'Solicitor',
        action: 'Complete legal review'
      },
      'Contract Exchange': {
        type: this.blockerTypes.SOLICITOR_ACTION,
        party: 'Solicitor',
        action: 'Exchange contracts'
      },
      'Completion': {
        type: this.blockerTypes.BUYER_ACTION,
        party: 'Buyer',
        action: 'Complete final payment'
      }
    };

    const mapping = stepMappings[step.stage];
    if (!mapping) return null;

    return {
      id: `timeline_${step.stage.toLowerCase().replace(/\s+/g, '_')}`,
      type: mapping.type,
      priority: step.status === 'action_required' ? 
        this.blockerPriorities.HIGH : this.blockerPriorities.MEDIUM,
      title: `${step.stage} Required`,
      description: `${step.stage} is ${step.status.replace('_', ' ')}`,
      responsibleParty: mapping.party,
      actionRequired: mapping.action,
      daysBlocked: this.calculateDaysBlocked(step.date),
      category: 'timeline'
    };
  }
  prioritizeBlockers(blockers) {
    const priorityOrder = {
      [this.blockerPriorities.CRITICAL]: 4,
      [this.blockerPriorities.HIGH]: 3,
      [this.blockerPriorities.MEDIUM]: 2,
      [this.blockerPriorities.LOW]: 1
    };

    return blockers.sort((a, b) => {
      // First sort by priority
      const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
      if (priorityDiff !== 0) return priorityDiff;
      
      // Then by days blocked (descending)
      return b.daysBlocked - a.daysBlocked;
    });
  }

  // UI Generation Methods
  generateBlockerAlert(blockers, userType = 'buyer') {
    if (blockers.length === 0) {
      return `
        <div class="blocker-alert success">
          <div class="alert-icon">
            <i class="fas fa-check-circle"></i>
          </div>
          <div class="alert-content">
            <h3>No Blockers Detected</h3>
            <p>Your transaction is progressing smoothly.</p>
          </div>
        </div>
      `;
    }

    const criticalBlockers = blockers.filter(b => b.priority === this.blockerPriorities.CRITICAL);
    const userBlockers = blockers.filter(b => this.isUserResponsible(b, userType));
    
    return `
      <div class="blocker-alert ${criticalBlockers.length > 0 ? 'critical' : 'warning'}">
        <div class="alert-icon">
          <i class="fas fa-exclamation-triangle"></i>
        </div>
        <div class="alert-content">
          <h3>${criticalBlockers.length > 0 ? 'Critical' : ''} Transaction Blockers (${blockers.length})</h3>
          <p>${userBlockers.length > 0 ? 
            `${userBlockers.length} item${userBlockers.length > 1 ? 's' : ''} require your attention.` :
            'Waiting for other parties to complete their actions.'
          }</p>
          <button class="btn-view-blockers" onclick="TransactionBlockers.showBlockerDetails()">
            View All Blockers
          </button>
        </div>
      </div>
    `;
  }
  generateBlockerList(blockers, userType = 'buyer') {
    if (blockers.length === 0) {
      return '<div class="no-blockers">No blockers found for this transaction.</div>';
    }

    return `
      <div class="blocker-list">
        ${blockers.map(blocker => this.generateBlockerCard(blocker, userType)).join('')}
      </div>
    `;
  }

  generateBlockerCard(blocker, userType) {
    const isUserResponsible = this.isUserResponsible(blocker, userType);
    const urgencyClass = this.getUrgencyClass(blocker);
    
    return `
      <div class="blocker-card ${urgencyClass} ${isUserResponsible ? 'user-action' : 'other-action'}">
        <div class="blocker-header">
          <div class="blocker-priority">
            <span class="priority-badge ${blocker.priority}">${blocker.priority}</span>
            ${blocker.daysBlocked > 0 ? `<span class="days-blocked">${blocker.daysBlocked} days</span>` : ''}
          </div>
          <div class="blocker-category">${blocker.category}</div>
        </div>
        
        <div class="blocker-content">
          <h4 class="blocker-title">${blocker.title}</h4>
          <p class="blocker-description">${blocker.description}</p>
          
          <div class="blocker-details">
            <div class="responsible-party">
              <strong>Responsible:</strong> ${blocker.responsibleParty}
            </div>
            <div class="action-required">
              <strong>Action:</strong> ${blocker.actionRequired}
            </div>
          </div>
        </div>
        
        ${isUserResponsible ? `
          <div class="blocker-actions">
            ${this.generateActionButton(blocker)}
          </div>
        ` : ''}
      </div>
    `;
  }
  generateActionButton(blocker) {
    const actionMappings = {
      'Upload document': {
        icon: 'fas fa-upload',
        class: 'btn-primary',
        action: `TransactionBlockers.handleDocumentUpload('${blocker.id}')`
      },
      'Complete buyer profile': {
        icon: 'fas fa-user-edit',
        class: 'btn-primary',
        action: `TransactionBlockers.handleProfileUpdate('${blocker.id}')`
      },
      'Arrange property survey': {
        icon: 'fas fa-calendar-plus',
        class: 'btn-secondary',
        action: `TransactionBlockers.handleSurveyBooking('${blocker.id}')`
      }
    };

    const mapping = actionMappings[blocker.actionRequired];
    if (!mapping) {
      return `
        <button class="btn-info" onclick="TransactionBlockers.showHelp('${blocker.id}')">
          <i class="fas fa-question-circle"></i> Get Help
        </button>
      `;
    }

    return `
      <button class="${mapping.class}" onclick="${mapping.action}">
        <i class="${mapping.icon}"></i> ${blocker.actionRequired}
      </button>
    `;
  }

  // Dashboard widget for showing blocker summary
  generateBlockerWidget(transactions, userType) {
    const allBlockers = [];
    
    transactions.forEach(transaction => {
      const transactionBlockers = this.detectTransactionBlockers(transaction);
      transactionBlockers.forEach(blocker => {
        blocker.transactionId = transaction.id;
        blocker.propertyTitle = transaction.title;
      });
      allBlockers.push(...transactionBlockers);
    });

    const userBlockers = allBlockers.filter(blocker => this.isUserResponsible(blocker, userType));
    const criticalBlockers = allBlockers.filter(blocker => blocker.priority === this.blockerPriorities.CRITICAL);

    return `
      <div class="blocker-widget">
        <div class="widget-header">
          <h3>Transaction Blockers</h3>
          <span class="widget-count">${allBlockers.length}</span>
        </div>
        
        <div class="blocker-summary">
          <div class="summary-stat critical">
            <div class="stat-number">${criticalBlockers.length}</div>
            <div class="stat-label">Critical</div>
          </div>
          <div class="summary-stat user-action">
            <div class="stat-number">${userBlockers.length}</div>
            <div class="stat-label">Your Action</div>
          </div>
          <div class="summary-stat total">
            <div class="stat-number">${allBlockers.length}</div>
            <div class="stat-label">Total</div>
          </div>
        </div>
        
        ${userBlockers.length > 0 ? `
          <div class="urgent-actions">
            <h4>Urgent Actions Required:</h4>
            <ul>
              ${userBlockers.slice(0, 3).map(blocker => `
                <li onclick="TransactionBlockers.goToTransaction('${blocker.transactionId}')">
                  <span class="action-title">${blocker.title}</span>
                  <span class="property-ref">${blocker.propertyTitle}</span>
                </li>
              `).join('')}
            </ul>
            ${userBlockers.length > 3 ? `
              <button class="btn-view-all" onclick="TransactionBlockers.showAllBlockers()">
                View All ${userBlockers.length} Actions
              </button>
            ` : ''}
          </div>
        ` : ''}
      </div>
    `;
  }
  // Utility Methods
  isUserResponsible(blocker, userType) {
    if (userType === 'buyer' && blocker.type === this.blockerTypes.BUYER_ACTION) return true;
    if (userType === 'developer' && blocker.type === this.blockerTypes.DEVELOPER_ACTION) return true;
    return false;
  }

  getUrgencyClass(blocker) {
    if (blocker.priority === this.blockerPriorities.CRITICAL) return 'urgent';
    if (blocker.daysBlocked > 7) return 'overdue';
    if (blocker.daysBlocked > 3) return 'delayed';
    return 'normal';
  }

  calculateDaysBlocked(dateString) {
    if (!dateString) return 0;
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  calculateDaysOverdue(dateString) {
    if (!dateString) return 0;
    const dueDate = new Date(dateString);
    const now = new Date();
    if (now <= dueDate) return 0;
    const diffTime = now - dueDate;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  }

  getResponsibleParty(stage) {
    const partyMappings = {
      'Survey Ordered': 'Buyer',
      'Mortgage Application': 'Mortgage Provider', 
      'Legal Review': 'Solicitor',
      'Contract Exchange': 'Solicitor',
      'Completion': 'Buyer'
    };
    return partyMappings[stage] || 'Unknown';
  }

  getResponsiblePartyType(stage) {
    const typeMappings = {
      'Survey Ordered': this.blockerTypes.BUYER_ACTION,
      'Mortgage Application': this.blockerTypes.MORTGAGE_PROVIDER,
      'Legal Review': this.blockerTypes.SOLICITOR_ACTION,
      'Contract Exchange': this.blockerTypes.SOLICITOR_ACTION,
      'Completion': this.blockerTypes.BUYER_ACTION
    };
    return typeMappings[stage] || this.blockerTypes.EXTERNAL_AUTHORITY;
  }
}

// Global instance
const TransactionBlockers = new TransactionBlockerSystem();
// Integration methods for existing portal
window.TransactionBlockers = {
  // Main detection method
  detectBlockers: (transactionId) => {
    const transaction = PortalData.properties.find(p => p.id === transactionId);
    if (!transaction) return [];
    return TransactionBlockers.detectTransactionBlockers(transaction);
  },

  // Show blocker details modal
  showBlockerDetails: (transactionId) => {
    const transaction = PortalData.properties.find(p => p.id === transactionId);
    if (!transaction) return;
    
    const blockers = TransactionBlockers.detectTransactionBlockers(transaction);
    const userType = Portal.currentUser?.role || 'buyer';
    
    const modalContent = `
      <div class="blocker-modal">
        <h2>Transaction Blockers - ${transaction.title}</h2>
        ${TransactionBlockers.generateBlockerList(blockers, userType)}
      </div>
    `;
    
    // Show modal (implement based on your modal system)
    Portal.showModal('Transaction Blockers', modalContent);
  },

  // Handle specific blocker actions
  handleDocumentUpload: (blockerId) => {
    console.log('Handle document upload for blocker:', blockerId);
    // Redirect to document upload page
    window.location.href = 'document-verification.html';
  },

  handleProfileUpdate: (blockerId) => {
    console.log('Handle profile update for blocker:', blockerId);
    // Show profile update form
  },

  handleSurveyBooking: (blockerId) => {
    console.log('Handle survey booking for blocker:', blockerId);
    // Show survey booking interface
  },

  showHelp: (blockerId) => {
    console.log('Show help for blocker:', blockerId);
    // Show contextual help
  },

  goToTransaction: (transactionId) => {
    window.location.href = `transaction-timeline.html?id=${transactionId}`;
  },

  showAllBlockers: () => {
    window.location.href = 'transaction-tracker.html?view=blockers';
  }
};