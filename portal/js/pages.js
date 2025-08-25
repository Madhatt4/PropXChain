// PropXchain Portal Pages
const Pages = {
  // Developer Dashboard
  developerDashboard() {
    const properties = DataHelpers.getUserProperties('emmadev', 'developer');
    const stats = this.calculateDeveloperStats(properties);
    
    return `
      <div class="dashboard-content">
        <!-- Statistics Cards -->
        <div class="grid grid-cols-4 mb-6">
          ${Components.createStatCard({
            icon: 'fas fa-building',
            label: 'Active Properties',
            value: stats.activeProperties,
            color: 'blue',
            change: 12.5
          })}
          ${Components.createStatCard({
            icon: 'fas fa-exchange-alt',
            label: 'Pending Transactions',
            value: stats.pendingTransactions,
            color: 'orange',
            change: -5.2
          })}
          ${Components.createStatCard({
            icon: 'fas fa-check-circle',
            label: 'Completed This Month',
            value: stats.completedThisMonth,
            color: 'green',
            change: 18.7
          })}
          ${Components.createStatCard({
            icon: 'fas fa-clock',
            label: 'Avg. Completion Time',
            value: stats.avgCompletionTime + ' days',
            color: 'blue',
            change: -12.3
          })}
        </div>

        <!-- Charts Row -->
        <div class="grid grid-cols-2 mb-6">
          ${Components.createChart('transactionProgressChart', 'Transaction Progress Over Time', [
            { icon: 'fas fa-sync-alt', onclick: 'Portal.refreshChart("transactionProgressChart")' },
            { icon: 'fas fa-download', onclick: 'Portal.exportChart("transactionProgressChart")' }
          ])}
          ${Components.createChart('documentStatusChart', 'Document Verification Status', [
            { icon: 'fas fa-sync-alt', onclick: 'Portal.refreshChart("documentStatusChart")' }
          ])}
        </div>

        <!-- Properties Overview -->
        <div class="card mb-6">
          <div class="card-header">
            <h3 class="card-title">Property Transactions</h3>
            <div class="page-actions">
              <button class="btn btn-secondary" onclick="Portal.exportData('properties')">
                <i class="fas fa-download"></i> Export
              </button>
              <button class="btn btn-primary" onclick="Portal.showPage('new-property')">
                <i class="fas fa-plus"></i> Add Property
              </button>
            </div>
          </div>
          <div class="card-body">
            ${Components.createTable(
              properties,
              [
                { 
                  key: 'title', 
                  label: 'Property',
                  render: (value, row) => `
                    <div class="property-cell">
                      <img src="${row.images[0]}" alt="" class="property-thumbnail">
                      <div>
                        <div class="property-title">${value}</div>
                        <div class="property-address">${row.address}</div>
                      </div>
                    </div>
                  `
                },
                { key: 'type', label: 'Type' },
                { 
                  key: 'status', 
                  label: 'Status',
                  render: (value) => `<span class="status-badge ${DataHelpers.getStatusColor(value)}">${value.replace('_', ' ')}</span>`
                },
                { 
                  key: 'progress', 
                  label: 'Progress',
                  render: (value) => `
                    <div class="progress-cell">
                      <div class="progress-bar">
                        <div class="progress-fill" style="width: ${value}%"></div>
                      </div>
                      <span class="progress-text">${value}%</span>
                    </div>
                  `
                },
                { key: 'buyerName', label: 'Buyer' },
                { 
                  key: 'price', 
                  label: 'Value',
                  render: (value) => DataHelpers.formatCurrency(value)
                }
              ],
              [
                { label: 'View', class: 'btn-primary', icon: 'fas fa-eye', onclick: 'Portal.viewProperty' },
                { label: 'Edit', class: 'btn-secondary', icon: 'fas fa-edit', onclick: 'Portal.editProperty' }
              ]
            )}
          </div>
        </div>

        <!-- Recent Activity -->
        <div class="grid grid-cols-2">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">Recent Activity</h3>
            </div>
            <div class="card-body">
              ${Components.createActivityFeed(PortalData.analytics.recentActivity.slice(0, 5))}
            </div>
          </div>
          
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">Document Status Overview</h3>
            </div>
            <div class="card-body">
              <div class="document-stats">
                <div class="stat-item">
                  <span class="stat-number">${PortalData.analytics.documentStats.verifiedDocuments}</span>
                  <span class="stat-label">Verified Documents</span>
                  <div class="stat-bar">
                    <div class="stat-bar-fill success" style="width: 85%"></div>
                  </div>
                </div>
                <div class="stat-item">
                  <span class="stat-number">${PortalData.analytics.documentStats.pendingDocuments}</span>
                  <span class="stat-label">Pending Review</span>
                  <div class="stat-bar">
                    <div class="stat-bar-fill warning" style="width: 35%"></div>
                  </div>
                </div>
                <div class="stat-item">
                  <span class="stat-number">${PortalData.analytics.documentStats.actionRequired}</span>
                  <span class="stat-label">Action Required</span>
                  <div class="stat-bar">
                    <div class="stat-bar-fill error" style="width: 25%"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // Buyer Dashboard
  buyerDashboard() {
    const properties = DataHelpers.getUserProperties('jamesbrown', 'buyer');
    const property = properties[0]; // Buyer typically has one active property
    
    if (!property) {
      return `
        <div class="empty-state">
          <i class="fas fa-home"></i>
          <h2>No Active Property Transaction</h2>
          <p>You don't have any active property transactions at the moment.</p>
        </div>
      `;
    }

    return `
      <div class="buyer-dashboard">
        <!-- Property Overview Card -->
        <div class="card property-overview mb-6">
          <div class="card-body">
            <div class="property-hero">
              <div class="property-images">
                <img src="${property.images[0]}" alt="${property.title}" class="main-image">
                ${property.images.slice(1).map(img => 
                  `<img src="${img}" alt="" class="thumb-image">`
                ).join('')}
              </div>
              <div class="property-info">
                <h1 class="property-title">${property.title}</h1>
                <p class="property-address">
                  <i class="fas fa-map-marker-alt"></i>
                  ${property.address}
                </p>
                <div class="property-details">
                  <div class="detail-item">
                    <i class="fas fa-bed"></i>
                    <span>${property.details.bedrooms} bed${property.details.bedrooms !== 1 ? 's' : ''}</span>
                  </div>
                  <div class="detail-item">
                    <i class="fas fa-bath"></i>
                    <span>${property.details.bathrooms} bath${property.details.bathrooms !== 1 ? 's' : ''}</span>
                  </div>
                  <div class="detail-item">
                    <i class="fas fa-ruler-combined"></i>
                    <span>${property.details.sqft.toLocaleString()} sq ft</span>
                  </div>
                  ${property.details.parking ? `
                    <div class="detail-item">
                      <i class="fas fa-car"></i>
                      <span>${property.details.parking} parking</span>
                    </div>
                  ` : ''}
                </div>
                <div class="property-price">
                  <span class="price-label">Purchase Price</span>
                  <span class="price-value">${DataHelpers.formatCurrency(property.price)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Progress Overview -->
        <div class="grid grid-cols-3 mb-6">
          ${Components.createStatCard({
            icon: 'fas fa-percentage',
            label: 'Transaction Progress',
            value: property.progress + '%',
            color: 'blue'
          })}
          ${Components.createStatCard({
            icon: 'fas fa-file-check',
            label: 'Documents Verified',
            value: property.documents.filter(d => d.status === 'verified').length,
            color: 'green'
          })}
          ${Components.createStatCard({
            icon: 'fas fa-exclamation-triangle',
            label: 'Actions Required',
            value: property.documents.filter(d => d.status === 'action_required' || d.status === 'pending').length,
            color: 'orange'
          })}
        </div>

        <!-- Current Stage & Timeline -->
        <div class="grid grid-cols-2 mb-6">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">Current Stage</h3>
            </div>
            <div class="card-body">
              <div class="current-stage">
                <div class="stage-icon">
                  <i class="fas fa-gavel"></i>
                </div>
                <div class="stage-info">
                  <h3>${property.stage}</h3>
                  <p>Your transaction is currently in the ${property.stage.toLowerCase()} phase. 
                     We're working with your solicitor to review all legal documents.</p>
                  <div class="stage-progress">
                    <div class="progress-bar">
                      <div class="progress-fill" style="width: ${property.progress}%"></div>
                    </div>
                    <span>${property.progress}% Complete</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card-header">
              <h3 class="card-title">Quick Actions</h3>
            </div>
            <div class="card-body">
              <div class="quick-actions">
                <button class="action-btn" onclick="Portal.showPage('documents')">
                  <i class="fas fa-folder"></i>
                  <span>View Documents</span>
                </button>
                <button class="action-btn" onclick="Portal.showPage('timeline')">
                  <i class="fas fa-history"></i>
                  <span>Transaction Timeline</span>
                </button>
                <button class="action-btn" onclick="Portal.showPage('communications')">
                  <i class="fas fa-comments"></i>
                  <span>Messages</span>
                </button>
                <button class="action-btn" onclick="Portal.viewBlockchain('${property.id}')">
                  <i class="fas fa-cube"></i>
                  <span>Blockchain Verification</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Documents Status -->
        <div class="card mb-6">
          <div class="card-header">
            <h3 class="card-title">Document Status</h3>
            <button class="btn btn-primary" onclick="Portal.showPage('upload')">
              <i class="fas fa-upload"></i> Upload Documents
            </button>
          </div>
          <div class="card-body">
            ${Components.createDocumentList(property.documents)}
          </div>
        </div>

        <!-- Timeline -->
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Transaction Timeline</h3>
          </div>
          <div class="card-body">
            ${Components.createTimeline(property.timeline)}
          </div>
        </div>
      </div>
    `;
  },

  // Property Details Page
  propertyDetails(propertyId) {
    const property = DataHelpers.getProperty(propertyId);
    if (!property) {
      return '<div class="error">Property not found</div>';
    }

    return `
      <div class="property-details">
        <div class="property-header mb-6">
          <div class="property-images-gallery">
            <div class="main-image-container">
              <img src="${property.images[0]}" alt="${property.title}" class="main-property-image">
            </div>
            <div class="image-thumbnails">
              ${property.images.map((img, index) => `
                <img src="${img}" alt="" class="thumbnail ${index === 0 ? 'active' : ''}" 
                     onclick="Portal.changeMainImage('${img}')">
              `).join('')}
            </div>
          </div>
          
          <div class="property-info">
            <h1>${property.title}</h1>
            <p class="address">
              <i class="fas fa-map-marker-alt"></i>
              ${property.address}
            </p>
            
            <div class="property-meta">
              <div class="meta-item">
                <span class="label">Type</span>
                <span class="value">${property.type}</span>
              </div>
              <div class="meta-item">
                <span class="label">Developer</span>
                <span class="value">${property.developer}</span>
              </div>
              <div class="meta-item">
                <span class="label">Buyer</span>
                <span class="value">${property.buyerName}</span>
              </div>
              <div class="meta-item">
                <span class="label">Purchase Price</span>
                <span class="value price">${DataHelpers.formatCurrency(property.price)}</span>
              </div>
            </div>

            <div class="property-features">
              <div class="feature">
                <i class="fas fa-bed"></i>
                <span>${property.details.bedrooms} Bedroom${property.details.bedrooms !== 1 ? 's' : ''}</span>
              </div>
              <div class="feature">
                <i class="fas fa-bath"></i>
                <span>${property.details.bathrooms} Bathroom${property.details.bathrooms !== 1 ? 's' : ''}</span>
              </div>
              <div class="feature">
                <i class="fas fa-ruler-combined"></i>
                <span>${property.details.sqft.toLocaleString()} sq ft</span>
              </div>
              ${property.details.parking ? `
                <div class="feature">
                  <i class="fas fa-car"></i>
                  <span>${property.details.parking} Parking Space${property.details.parking !== 1 ? 's' : ''}</span>
                </div>
              ` : ''}
              ${property.details.balcony ? '<div class="feature"><i class="fas fa-tree"></i><span>Balcony</span></div>' : ''}
              ${property.details.garden ? '<div class="feature"><i class="fas fa-seedling"></i><span>Garden</span></div>' : ''}
            </div>

            <div class="transaction-status">
              <div class="status-header">
                <span class="status-badge ${DataHelpers.getStatusColor(property.status)}">
                  ${property.status.replace('_', ' ')}
                </span>
                <span class="progress-text">${property.progress}% Complete</span>
              </div>
              <div class="progress-bar">
                <div class="progress-fill" style="width: ${property.progress}%"></div>
              </div>
              <p class="stage-text">Current Stage: <strong>${property.stage}</strong></p>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-2 mb-6">
          <!-- Timeline -->
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">Transaction Timeline</h3>
            </div>
            <div class="card-body">
              ${Components.createTimeline(property.timeline)}
            </div>
          </div>

          <!-- Blockchain Information -->
          ${Components.createBlockchainCard(property)}
        </div>

        <!-- Documents -->
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Transaction Documents</h3>
            <button class="btn btn-primary" onclick="Portal.showDocumentUpload('${property.id}')">
              <i class="fas fa-plus"></i> Add Document
            </button>
          </div>
          <div class="card-body">
            ${Components.createDocumentList(property.documents)}
          </div>
        </div>
      </div>
    `;
  },

  // Analytics Page (Developer only)
  analytics() {
    return `
      <div class="analytics-page">
        <!-- Key Metrics -->
        <div class="grid grid-cols-4 mb-6">
          ${Components.createStatCard({
            icon: 'fas fa-pound-sign',
            label: 'Total Transaction Value',
            value: DataHelpers.formatCurrency(PortalData.analytics.transactionMetrics.totalValue),
            color: 'green',
            change: 15.3
          })}
          ${Components.createStatCard({
            icon: 'fas fa-chart-line',
            label: 'Monthly Growth',
            value: PortalData.analytics.transactionMetrics.monthlyGrowth + '%',
            color: 'blue',
            change: 8.2
          })}
          ${Components.createStatCard({
            icon: 'fas fa-clock',
            label: 'Avg. Completion Time',
            value: PortalData.analytics.transactionMetrics.averageCompletionTime + ' days',
            color: 'orange',
            change: -18.5
          })}
          ${Components.createStatCard({
            icon: 'fas fa-percentage',
            label: 'Document Verification Rate',
            value: PortalData.analytics.documentStats.verificationRate + '%',
            color: 'purple',
            change: 5.7
          })}
        </div>

        <!-- Charts -->
        <div class="grid grid-cols-2 mb-6">
          ${Components.createChart('analyticsTransactionChart', 'Transaction Volume Trends')}
          ${Components.createChart('analyticsCompletionChart', 'Average Completion Time Improvement')}
        </div>

        <div class="grid grid-cols-2 mb-6">
          ${Components.createChart('analyticsDocumentChart', 'Document Processing Status')}
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">Performance Insights</h3>
            </div>
            <div class="card-body">
              <div class="insights-list">
                <div class="insight-item positive">
                  <i class="fas fa-arrow-up"></i>
                  <div>
                    <h4>Completion Time Reduced</h4>
                    <p>Average transaction time decreased by 18.5% compared to last quarter</p>
                  </div>
                </div>
                <div class="insight-item positive">
                  <i class="fas fa-check-circle"></i>
                  <div>
                    <h4>High Verification Rate</h4>
                    <p>84.5% of documents are verified on first submission</p>
                  </div>
                </div>
                <div class="insight-item neutral">
                  <i class="fas fa-exclamation-triangle"></i>
                  <div>
                    <h4>Action Items</h4>
                    <p>22 documents currently require buyer action across all transactions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Detailed Analytics Table -->
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Transaction Performance Analysis</h3>
            <div class="analytics-filters">
              <select class="analytics-filter" onchange="Portal.filterAnalytics('timeRange', this.value)">
                <option value="30">Last 30 Days</option>
                <option value="90">Last 90 Days</option>
                <option value="365">Last Year</option>
              </select>
              <select class="analytics-filter" onchange="Portal.filterAnalytics('propertyType', this.value)">
                <option value="all">All Property Types</option>
                <option value="apartment">Apartments</option>
                <option value="house">Houses</option>
                <option value="penthouse">Penthouses</option>
              </select>
            </div>
          </div>
          <div class="card-body">
            ${Components.createTable(
              PortalData.properties,
              [
                { key: 'id', label: 'Transaction ID' },
                { key: 'type', label: 'Property Type' },
                { 
                  key: 'progress', 
                  label: 'Progress',
                  render: (value) => `${value}%`
                },
                { 
                  key: 'timeline', 
                  label: 'Days Active',
                  render: (value, row) => {
                    const startDate = new Date(value[0].date);
                    return DataHelpers.daysSince(startDate);
                  }
                },
                { 
                  key: 'documents', 
                  label: 'Document Status',
                  render: (value) => {
                    const verified = value.filter(d => d.status === 'verified').length;
                    return `${verified}/${value.length} verified`;
                  }
                },
                { 
                  key: 'price', 
                  label: 'Value',
                  render: (value) => DataHelpers.formatCurrency(value)
                }
              ]
            )}
          </div>
        </div>
      </div>
    `;
  },

  // Communications Page
  communications() {
    return `
      <div class="communications-page">
        <div class="grid grid-cols-3">
          <!-- Message List -->
          <div class="card messages-sidebar">
            <div class="card-header">
              <h3 class="card-title">Messages</h3>
              <button class="btn btn-primary" onclick="Portal.showNewMessage()">
                <i class="fas fa-plus"></i>
              </button>
            </div>
            <div class="card-body">
              <div class="message-list">
                ${PortalData.messages.map(msg => `
                  <div class="message-preview ${msg.read ? '' : 'unread'}" onclick="Portal.showMessage(${msg.id})">
                    <div class="message-preview-header">
                      <strong>${msg.from}</strong>
                      <span class="message-time">${new Date(msg.timestamp).toLocaleDateString('en-GB')}</span>
                    </div>
                    <div class="message-preview-subject">${msg.subject}</div>
                    <div class="message-preview-snippet">${msg.message.substring(0, 80)}...</div>
                    ${msg.propertyId ? `<div class="message-property">${msg.propertyId}</div>` : ''}
                  </div>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- Message Content -->
          <div class="card messages-content" style="grid-column: span 2;">
            <div class="card-header">
              <h3 class="card-title">Message Details</h3>
            </div>
            <div class="card-body" id="messageContent">
              <div class="empty-state">
                <i class="fas fa-envelope-open"></i>
                <h3>Select a message to view</h3>
                <p>Choose a message from the sidebar to read its contents.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  calculateDeveloperStats(properties) {
    const activeProperties = properties.filter(p => p.status === 'in_progress' || p.status === 'document_review').length;
    const pendingTransactions = properties.filter(p => p.progress < 100).length;
    const completedThisMonth = Math.floor(Math.random() * 8) + 3; // Simulated
    const avgCompletionTime = Math.round(properties.reduce((acc, p) => acc + (p.progress / 100 * 45), 0) / properties.length);

    return {
      activeProperties,
      pendingTransactions,
      completedThisMonth,
      avgCompletionTime
    };
  }
};