// PropXchain Portal Data Layer
const PortalData = {
  // User credentials and roles
  users: {
    'emmadev': {
      password: 'password123',
      role: 'developer',
      name: 'Emma Wilson',
      email: 'emma@northwalesdevelopments.co.uk',
      company: 'North Wales Developments',
      avatar: 'https://ui-avatars.com/api/?name=Emma+Wilson&background=0066cc&color=fff',
      permissions: ['view_all_properties', 'manage_properties', 'view_analytics', 'manage_documents']
    },
    'jamesbrown': {
      password: 'password123',
      role: 'buyer',
      name: 'James Brown',
      email: 'james.brown@email.com',
      company: null,
      avatar: 'https://ui-avatars.com/api/?name=James+Brown&background=10b981&color=fff',
      permissions: ['view_own_property', 'upload_documents', 'communicate']
    }
  },

  // Properties data
  properties: [
    {
      id: 'PX-2024-001',
      title: 'Riverside Apartments, Unit 301',
      address: '42 Thames View, London E14 9GE',
      type: 'Apartment',
      developer: 'North Wales Developments',
      buyerId: 'jamesbrown',
      buyerName: 'James Brown',
      price: 485000,
      status: 'in_progress',
      progress: 78,
      stage: 'Legal Review',
      images: [
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=300',
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=300'
      ],
      details: {
        bedrooms: 2,
        bathrooms: 2,
        sqft: 1200,
        parking: 1,
        balcony: true,
        completion: '2024-12-15'
      },
      blockchain: {
        contractAddress: '0x742d35cc6ad4c96c3f4b2f5f5f5f5f5f5f5f5f5f',
        transactionHash: '0x8a2f5c9d8e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b',
        blockNumber: 18234567,
        gasUsed: 245000,
        verified: true
      },
      timeline: [
        { stage: 'Offer Accepted', date: '2024-01-15', status: 'completed', icon: 'fas fa-handshake', responsibleParty: 'developer' },
        { stage: 'Initial Verification', date: '2024-01-18', status: 'completed', icon: 'fas fa-check-circle', responsibleParty: 'system' },
        { stage: 'Survey Ordered', date: '2024-01-22', status: 'completed', icon: 'fas fa-search', responsibleParty: 'buyer' },
        { stage: 'Mortgage Application', date: '2024-01-25', status: 'completed', icon: 'fas fa-university', responsibleParty: 'mortgage_provider' },
        { stage: 'Legal Review', date: '2024-02-01', status: 'in_progress', icon: 'fas fa-gavel', responsibleParty: 'solicitor' },
        { stage: 'Contract Exchange', date: '2024-02-15', status: 'pending', icon: 'fas fa-file-signature', responsibleParty: 'solicitor' },
        { stage: 'Completion', date: '2024-03-01', status: 'pending', icon: 'fas fa-key', responsibleParty: 'buyer' }
      ],
      documents: [
        { id: 1, name: 'Purchase Agreement', type: 'contract', status: 'verified', uploadDate: '2024-01-16', fileSize: '2.4 MB', dueDate: '2024-01-20', requiredBy: 'buyer' },
        { id: 2, name: 'Property Survey Report', type: 'survey', status: 'verified', uploadDate: '2024-01-23', fileSize: '8.7 MB', dueDate: '2024-01-25', requiredBy: 'buyer' },
        { id: 3, name: 'Mortgage Offer Letter', type: 'financial', status: 'verified', uploadDate: '2024-01-26', fileSize: '1.2 MB', dueDate: '2024-01-30', requiredBy: 'buyer' },
        { id: 4, name: 'Building Regulations Certificate', type: 'legal', status: 'verified', uploadDate: '2024-01-20', fileSize: '856 KB', dueDate: '2024-01-25', requiredBy: 'developer' },
        { id: 5, name: 'Energy Performance Certificate', type: 'certificate', status: 'verified', uploadDate: '2024-01-19', fileSize: '1.1 MB', dueDate: '2024-01-22', requiredBy: 'developer' },
        { id: 6, name: 'Local Authority Search', type: 'search', status: 'action_required', uploadDate: null, fileSize: null, dueDate: '2024-02-05', requiredBy: 'buyer' },
        { id: 7, name: 'Title Deeds', type: 'legal', status: 'under_review', uploadDate: '2024-02-01', fileSize: '3.2 MB', dueDate: '2024-02-10', requiredBy: 'solicitor' }
      ],
      createdDate: '2024-01-15',
      lastUpdated: '2024-02-01'
    },
    {
      id: 'PX-2024-002',
      title: 'Oakwood Terrace, No. 7',
      address: '7 Oakwood Terrace, Manchester M4 6DJ',
      type: 'House',
      developer: 'North Wales Developments',
      buyerId: 'buyer002',
      buyerName: 'Sarah Mitchell',
      price: 325000,
      status: 'document_review',
      progress: 45,
      stage: 'Document Review',
      images: [
        'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=300'
      ],
      details: {
        bedrooms: 3,
        bathrooms: 2,
        sqft: 1450,
        parking: 2,
        garden: true,
        completion: '2024-11-30'
      },
      blockchain: {
        contractAddress: '0x851e46ec7ba4c97d4e3c5d7f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b',
        transactionHash: null,
        blockNumber: null,
        gasUsed: null,
        verified: false
      },
      timeline: [
        { stage: 'Offer Accepted', date: '2024-01-08', status: 'completed', icon: 'fas fa-handshake' },
        { stage: 'Initial Verification', date: '2024-01-10', status: 'completed', icon: 'fas fa-check-circle' },
        { stage: 'Survey Ordered', date: '2024-01-15', status: 'in_progress', icon: 'fas fa-search' },
        { stage: 'Mortgage Application', date: '2024-01-20', status: 'pending', icon: 'fas fa-university' },
        { stage: 'Legal Review', date: '2024-02-05', status: 'pending', icon: 'fas fa-gavel' },
        { stage: 'Contract Exchange', date: '2024-02-20', status: 'pending', icon: 'fas fa-file-signature' },
        { stage: 'Completion', date: '2024-03-10', status: 'pending', icon: 'fas fa-key' }
      ],
      documents: [
        { id: 8, name: 'Purchase Agreement', type: 'contract', status: 'verified', uploadDate: '2024-01-09', fileSize: '2.1 MB' },
        { id: 9, name: 'Property Survey', type: 'survey', status: 'pending', uploadDate: null, fileSize: null },
        { id: 10, name: 'Mortgage Application', type: 'financial', status: 'under_review', uploadDate: '2024-01-12', fileSize: '1.8 MB' }
      ]
    },
    {
      id: 'PX-2024-003',
      title: 'Harbor View Plaza, Unit 1205',
      address: '1205 Harbor View Plaza, Liverpool L3 4AA',
      type: 'Penthouse',
      developer: 'North Wales Developments',
      buyerId: 'buyer003',
      buyerName: 'Michael Chen',
      price: 750000,
      status: 'action_required',
      progress: 25,
      stage: 'Awaiting Documents',
      images: [
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=300'
      ],
      details: {
        bedrooms: 3,
        bathrooms: 3,
        sqft: 2200,
        parking: 2,
        terrace: true,
        completion: '2024-10-15'
      },
      blockchain: {
        contractAddress: '0x9a3b6c5e2f8d7a1b4c9e6f0a2d5b8e1c4f7a0d3b6e9c2f5a8b1e4d7c0f3a6b9',
        transactionHash: null,
        blockNumber: null,
        gasUsed: null,
        verified: false
      },
      timeline: [
        { stage: 'Offer Accepted', date: '2024-01-12', status: 'completed', icon: 'fas fa-handshake', responsibleParty: 'developer' },
        { stage: 'Initial Verification', date: '2024-01-15', status: 'completed', icon: 'fas fa-check-circle', responsibleParty: 'system' },
        { stage: 'Survey Ordered', date: '2024-01-18', status: 'action_required', icon: 'fas fa-search', responsibleParty: 'buyer' },
        { stage: 'Mortgage Application', date: '2024-01-25', status: 'pending', icon: 'fas fa-university', responsibleParty: 'mortgage_provider' },
        { stage: 'Legal Review', date: '2024-02-10', status: 'pending', icon: 'fas fa-gavel', responsibleParty: 'solicitor' },
        { stage: 'Contract Exchange', date: '2024-02-25', status: 'pending', icon: 'fas fa-file-signature', responsibleParty: 'solicitor' },
        { stage: 'Completion', date: '2024-03-15', status: 'pending', icon: 'fas fa-key', responsibleParty: 'buyer' }
      ],
      documents: [
        { id: 11, name: 'Purchase Agreement', type: 'contract', status: 'verified', uploadDate: '2024-01-13', fileSize: '3.1 MB', dueDate: '2024-01-15', requiredBy: 'buyer' },
        { id: 12, name: 'Property Survey', type: 'survey', status: 'action_required', uploadDate: null, fileSize: null, dueDate: '2024-01-20', requiredBy: 'buyer' },
        { id: 13, name: 'Insurance Documents', type: 'insurance', status: 'action_required', uploadDate: null, fileSize: null, dueDate: '2024-01-25', requiredBy: 'buyer' }
      ],
      createdDate: '2024-01-12',
      lastUpdated: '2024-01-18'
    },
    {
      id: 'PX-2024-004',
      title: 'Riverside Gardens, No. 12',
      address: '12 Riverside Gardens, Chester CH1 3BF',
      type: 'Townhouse',
      developer: 'North Wales Developments',
      buyerId: 'buyer004',
      buyerName: 'Emily Rodriguez',
      price: 445000,
      status: 'completion_ready',
      progress: 95,
      stage: 'Ready for Completion',
      images: [
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300'
      ],
      details: {
        bedrooms: 4,
        bathrooms: 3,
        sqft: 1850,
        parking: 2,
        garden: true,
        completion: '2024-08-30'
      },
      blockchain: {
        contractAddress: '0xa2b5c8e1f4d7a0b3c6e9f2a5d8b1e4c7f0a3b6c9e2f5d8a1b4e7c0f3a6b9c2f5',
        transactionHash: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b',
        blockNumber: 18245123,
        gasUsed: 298000,
        verified: true
      },
      timeline: [
        { stage: 'Offer Accepted', date: '2023-12-05', status: 'completed', icon: 'fas fa-handshake' },
        { stage: 'Initial Verification', date: '2023-12-07', status: 'completed', icon: 'fas fa-check-circle' },
        { stage: 'Survey Ordered', date: '2023-12-12', status: 'completed', icon: 'fas fa-search' },
        { stage: 'Mortgage Application', date: '2023-12-15', status: 'completed', icon: 'fas fa-university' },
        { stage: 'Legal Review', date: '2024-01-05', status: 'completed', icon: 'fas fa-gavel' },
        { stage: 'Contract Exchange', date: '2024-01-20', status: 'completed', icon: 'fas fa-file-signature' },
        { stage: 'Completion', date: '2024-02-28', status: 'ready', icon: 'fas fa-key' }
      ],
      documents: [
        { id: 14, name: 'Purchase Agreement', type: 'contract', status: 'verified', uploadDate: '2023-12-06', fileSize: '2.8 MB' },
        { id: 15, name: 'Property Survey Report', type: 'survey', status: 'verified', uploadDate: '2023-12-14', fileSize: '9.2 MB' },
        { id: 16, name: 'Mortgage Offer', type: 'financial', status: 'verified', uploadDate: '2023-12-18', fileSize: '1.4 MB' },
        { id: 17, name: 'Building Regulations Certificate', type: 'legal', status: 'verified', uploadDate: '2023-12-10', fileSize: '856 KB' },
        { id: 18, name: 'Final Inspection Report', type: 'inspection', status: 'verified', uploadDate: '2024-02-20', fileSize: '2.3 MB' }
      ]
    }
  ],

  // Smart Contracts
  smartContracts: [
    {
      id: 'SC-2024-001',
      propertyId: 'PX-2024-001',
      contractAddress: '0x742d35cc6ad4c96c3f4b2f5f5f5f5f5f5f5f5f5f',
      deployedAt: '2024-01-16T15:45:00Z',
      status: 'active',
      type: 'PropertyPurchaseContract',
      functions: ['submitDeposit', 'verifyDocuments', 'executeCompletion', 'refundDeposit'],
      events: [
        { event: 'ContractDeployed', timestamp: '2024-01-16T15:45:00Z', blockNumber: 18234567 },
        { event: 'DepositReceived', timestamp: '2024-01-16T16:20:00Z', blockNumber: 18234580 },
        { event: 'DocumentVerified', timestamp: '2024-01-23T10:15:00Z', blockNumber: 18241234 }
      ]
    },
    {
      id: 'SC-2024-004',
      propertyId: 'PX-2024-004',
      contractAddress: '0xa2b5c8e1f4d7a0b3c6e9f2a5d8b1e4c7f0a3b6c9e2f5d8a1b4e7c0f3a6b9c2f5',
      deployedAt: '2023-12-06T14:30:00Z',
      status: 'completed',
      type: 'PropertyPurchaseContract',
      functions: ['submitDeposit', 'verifyDocuments', 'executeCompletion', 'refundDeposit'],
      events: [
        { event: 'ContractDeployed', timestamp: '2023-12-06T14:30:00Z', blockNumber: 18200123 },
        { event: 'DepositReceived', timestamp: '2023-12-06T15:10:00Z', blockNumber: 18200140 },
        { event: 'AllDocumentsVerified', timestamp: '2024-01-18T12:00:00Z', blockNumber: 18240000 },
        { event: 'CompletionExecuted', timestamp: '2024-02-28T12:00:00Z', blockNumber: 18245123 }
      ]
    }
  ],

  // Navigation structure for different user roles
  navigation: {
    developer: [
      {
        section: 'OVERVIEW',
        items: [
          { id: 'dashboard', label: 'Dashboard', icon: 'fas fa-home', active: true },
          { id: 'analytics', label: 'Analytics', icon: 'fas fa-chart-line' },
          { id: 'reports', label: 'Reports', icon: 'fas fa-file-chart' }
        ]
      },
      {
        section: 'PROPERTIES',
        items: [
          { id: 'properties', label: 'All Properties', icon: 'fas fa-building' },
          { id: 'new-property', label: 'Add Property', icon: 'fas fa-plus-circle' },
          { id: 'inventory', label: 'Inventory', icon: 'fas fa-warehouse' }
        ]
      },
      {
        section: 'TRANSACTIONS',
        items: [
          { id: 'transactions', label: 'All Transactions', icon: 'fas fa-exchange-alt' },
          { id: 'blockchain', label: 'Blockchain View', icon: 'fas fa-cube' },
          { id: 'smart-contracts', label: 'Smart Contracts', icon: 'fas fa-file-contract' }
        ]
      },
      {
        section: 'MANAGEMENT',
        items: [
          { id: 'documents', label: 'Documents', icon: 'fas fa-folder' },
          { id: 'communications', label: 'Communications', icon: 'fas fa-comments' },
          { id: 'buyers', label: 'Buyer Management', icon: 'fas fa-users' }
        ]
      }
    ],
    buyer: [
      {
        section: 'MY PROPERTY',
        items: [
          { id: 'dashboard', label: 'Dashboard', icon: 'fas fa-home', active: true },
          { id: 'property-details', label: 'Property Details', icon: 'fas fa-info-circle' },
          { id: 'timeline', label: 'Transaction Timeline', icon: 'fas fa-history' }
        ]
      },
      {
        section: 'DOCUMENTS',
        items: [
          { id: 'documents', label: 'Document Center', icon: 'fas fa-folder' },
          { id: 'upload', label: 'Upload Documents', icon: 'fas fa-upload' },
          { id: 'verification', label: 'Verification Status', icon: 'fas fa-check-shield' }
        ]
      },
      {
        section: 'SUPPORT',
        items: [
          { id: 'communications', label: 'Messages', icon: 'fas fa-comments' },
          { id: 'help', label: 'Help & Support', icon: 'fas fa-question-circle' }
        ]
      }
    ]
  },

  // Notifications
  notifications: [
    {
      id: 1,
      title: 'Document Verified',
      message: 'Your mortgage offer document has been successfully verified on the blockchain.',
      type: 'success',
      time: '2 minutes ago',
      read: false,
      icon: 'fas fa-check-circle'
    },
    {
      id: 2,
      title: 'Action Required',
      message: 'Local Authority Search document is required to proceed with your property purchase.',
      type: 'warning',
      time: '15 minutes ago',
      read: false,
      icon: 'fas fa-exclamation-triangle'
    },
    {
      id: 3,
      title: 'Transaction Progress',
      message: 'Your property has progressed to the Legal Review stage.',
      type: 'info',
      time: '2 hours ago',
      read: true,
      icon: 'fas fa-arrow-right'
    }
  ],

  // Analytics data
  analytics: {
    transactionMetrics: {
      totalTransactions: 156,
      activeTransactions: 4,
      completedTransactions: 142,
      averageCompletionTime: 18,
      totalValue: 2005000, // Sum of all property values
      monthlyGrowth: 18.7
    },
    documentStats: {
      totalDocuments: 23, // Total across all properties
      verifiedDocuments: 16,
      pendingDocuments: 3,
      actionRequired: 4,
      verificationRate: 69.6
    },
    recentActivity: [
      { type: 'document_verified', message: 'Survey document verified for PX-2024-001', time: '5 minutes ago' },
      { type: 'stage_progression', message: 'PX-2024-002 moved to Document Review', time: '1 hour ago' },
      { type: 'new_transaction', message: 'New transaction started: PX-2024-003', time: '2 hours ago' }
    ],
    
    chartData: {
      transactionProgress: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Transactions Started',
            data: [12, 19, 15, 25, 22, 18],
            borderColor: '#0066cc',
            backgroundColor: 'rgba(0, 102, 204, 0.1)',
            tension: 0.4
          },
          {
            label: 'Transactions Completed',
            data: [8, 15, 18, 20, 28, 25],
            borderColor: '#10b981',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            tension: 0.4
          }
        ]
      },
      
      documentStatus: {
        labels: ['Verified', 'Pending Review', 'Action Required'],
        datasets: [{
          data: [289, 31, 22],
          backgroundColor: ['#10b981', '#f59e0b', '#ef4444'],
          borderWidth: 0
        }]
      },
      
      completionTimes: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
        datasets: [{
          label: 'Average Completion Time (days)',
          data: [45, 38, 32, 28, 25, 23],
          borderColor: '#8b5cf6',
          backgroundColor: 'rgba(139, 92, 246, 0.1)',
          tension: 0.4
        }]
      }
    }
  }
};

// Helper functions
const DataHelpers = {
  // Get user by username
  getUser(username) {
    return PortalData.users[username] || null;
  },

  // Get properties for a user
  getUserProperties(userId, userRole) {
    if (userRole === 'developer') {
      return PortalData.properties;
    } else if (userRole === 'buyer') {
      return PortalData.properties.filter(p => p.buyerId === userId);
    }
    return [];
  },

  // Get property by ID
  getProperty(propertyId) {
    return PortalData.properties.find(p => p.id === propertyId);
  },

  // Get navigation for user role
  getNavigation(userRole) {
    return PortalData.navigation[userRole] || [];
  },

  // Get unread notification count
  getUnreadNotificationCount() {
    return PortalData.notifications.filter(n => !n.read).length;
  },

  // Format currency
  formatCurrency(amount) {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  },

  // Format date
  formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  },

  // Get status color
  getStatusColor(status) {
    const colors = {
      'completed': 'success',
      'verified': 'success',
      'in_progress': 'info',
      'under_review': 'warning',
      'document_review': 'warning',
      'action_required': 'error',
      'pending': 'warning'
    };
    return colors[status] || 'info';
  },

  // Calculate days since a date
  daysSince(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  },

  // Get current blocker for a property transaction
  getCurrentBlocker(property) {
    // First, check timeline for current stage
    const currentStage = property.timeline.find(stage => 
      stage.status === 'in_progress' || stage.status === 'action_required'
    );

    if (currentStage) {
      const stageName = currentStage.stage.toLowerCase();
      if (stageName.includes('survey')) {
        return { 
          party: 'buyer', 
          action: 'Schedule the property survey',
          type: 'timeline',
          stage: currentStage.stage
        };
      } else if (stageName.includes('mortgage')) {
        return { 
          party: 'buyer', 
          action: 'Submit mortgage application documents',
          type: 'timeline',
          stage: currentStage.stage
        };
      } else if (stageName.includes('legal')) {
        return { 
          party: 'solicitor', 
          action: 'Complete legal document review',
          type: 'timeline',
          stage: currentStage.stage
        };
      } else if (stageName.includes('contract')) {
        return { 
          party: 'developer', 
          action: 'Prepare contract for exchange',
          type: 'timeline',
          stage: currentStage.stage
        };
      } else if (stageName.includes('completion')) {
        return { 
          party: 'developer', 
          action: 'Schedule completion date',
          type: 'timeline',
          stage: currentStage.stage
        };
      }
    }

    // Check documents for action required
    const pendingDocuments = property.documents.filter(doc => 
      doc.status === 'action_required' || doc.status === 'pending'
    );

    if (pendingDocuments.length > 0) {
      const document = pendingDocuments[0];
      let party = 'buyer';
      let action = `Upload ${document.name}`;

      if (document.type === 'legal' || document.type === 'search') {
        party = 'solicitor';
        action = `Process ${document.name}`;
      }

      return {
        party,
        action,
        type: 'document',
        document: document.name
      };
    }

    // Default: no blocker
    return {
      party: 'none',
      action: 'Transaction progressing normally',
      type: 'none'
    };
  },

  // Get blocker icon based on party
  getBlockerIcon(party) {
    const icons = {
      'buyer': 'fas fa-user',
      'developer': 'fas fa-building',
      'solicitor': 'fas fa-gavel',
      'none': 'fas fa-check-circle'
    };
    return icons[party] || 'fas fa-question-circle';
  },

  // Get blocker color based on party
  getBlockerColor(party) {
    const colors = {
      'buyer': 'warning',
      'developer': 'info',
      'solicitor': 'primary',
      'none': 'success'
    };
    return colors[party] || 'info';
  }
};
