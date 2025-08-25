// PropXchain Portal Components
const Components = {
  // Create a statistics card
  createStatCard(stat) {
    const changeIcon = stat.change > 0 ? 'fa-arrow-up' : 'fa-arrow-down';
    const changeClass = stat.change > 0 ? 'positive' : 'negative';
    
    return `
      <div class="stat-card">
        <div class="stat-header">
          <div class="stat-icon ${stat.color}">
            <i class="${stat.icon}"></i>
          </div>
          ${stat.change ? `
            <div class="stat-change ${changeClass}">
              <i class="fas ${changeIcon}"></i>
              ${Math.abs(stat.change)}%
            </div>
          ` : ''}
        </div>
        <div class="stat-value">${stat.value}</div>
        <div class="stat-label">${stat.label}</div>
      </div>
    `;
  },

  // Create a property card for the grid view
  createPropertyCard(property) {
    const statusClass = DataHelpers.getStatusColor(property.status);
    const formattedPrice = DataHelpers.formatCurrency(property.price);
    
    return `
      <div class="card property-card" data-property-id="${property.id}">
        <div class="property-image-container">
          <img src="${property.images[0]}" alt="${property.title}" class="property-image">
          <div class="property-status">
            <span class="status-badge ${statusClass}">${property.status.replace('_', ' ')}</span>
          </div>
        </div>
        <div class="card-body">
          <h3 class="property-title">${property.title}</h3>
          <p class="property-address">${property.address}</p>
          <div class="property-meta">
            <span class="property-type">${property.type}</span>
            <span class="property-price">${formattedPrice}</span>
          </div>
          <div class="property-progress">
            <div class="progress-label">
              <span>Progress: ${property.progress}%</span>
              <span>${property.stage}</span>
            </div>
            <div class="progress-bar">
              <div class="progress-fill" style="width: ${property.progress}%"></div>
            </div>
          </div>
          <div class="property-buyer">
            <i class="fas fa-user"></i>
            <span>${property.buyerName}</span>
          </div>
        </div>
        <div class="card-footer">
          <button class="btn btn-primary" onclick="Portal.viewProperty('${property.id}')">
            View Details
          </button>
          <button class="btn btn-secondary" onclick="Portal.viewDocuments('${property.id}')">
            Documents
          </button>
        </div>
      </div>
    `;
  },

  // Create a transaction timeline
  createTimeline(timeline) {
    return `
      <div class="timeline">
        ${timeline.map((item, index) => `
          <div class="timeline-item ${item.status}">
            <div class="timeline-marker">
              <i class="${item.icon}"></i>
            </div>
            <div class="timeline-content">
              <div class="timeline-header">
                <h4>${item.stage}</h4>
                <span class="timeline-date">${DataHelpers.formatDate(item.date)}</span>
              </div>
              <div class="timeline-status">
                <span class="status-badge ${DataHelpers.getStatusColor(item.status)}">
                  ${item.status.replace('_', ' ')}
                </span>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  },

  // Create a document list
  createDocumentList(documents) {
    return `
      <div class="document-list">
        ${documents.map(doc => `
          <div class="document-item" data-doc-id="${doc.id}">
            <div class="document-icon">
              <i class="${PortalData.documentTypes[doc.type]?.icon || 'fas fa-file'}"></i>
            </div>
            <div class="document-info">
              <h4 class="document-name">${doc.name}</h4>
              <p class="document-type">${PortalData.documentTypes[doc.type]?.label || doc.type}</p>
              ${doc.uploadDate ? `
                <p class="document-date">Uploaded: ${DataHelpers.formatDate(doc.uploadDate)}</p>
              ` : ''}
            </div>
            <div class="document-status">
              <span class="status-badge ${DataHelpers.getStatusColor(doc.status)}">
                ${doc.status.replace('_', ' ')}
              </span>
            </div>
            <div class="document-actions">
              ${doc.status === 'verified' ? `
                <button class="btn btn-secondary" onclick="Portal.viewDocument('${doc.id}')">
                  <i class="fas fa-eye"></i> View
                </button>
              ` : doc.status === 'pending' ? `
                <button class="btn btn-primary" onclick="Portal.uploadDocument('${doc.id}')">
                  <i class="fas fa-upload"></i> Upload
                </button>
              ` : `
                <button class="btn btn-warning" onclick="Portal.reviewDocument('${doc.id}')">
                  <i class="fas fa-exclamation-triangle"></i> Review
                </button>
              `}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  },

  // Create a data table
  createTable(data, columns, actions = []) {
    return `
      <div class="table-container">
        <table class="table">
          <thead>
            <tr>
              ${columns.map(col => `<th>${col.label}</th>`).join('')}
              ${actions.length > 0 ? '<th>Actions</th>' : ''}
            </tr>
          </thead>
          <tbody>
            ${data.map(row => `
              <tr>
                ${columns.map(col => `
                  <td>
                    ${col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                `).join('')}
                ${actions.length > 0 ? `
                  <td class="table-actions">
                    ${actions.map(action => `
                      <button class="btn ${action.class}" onclick="${action.onclick}('${row.id || row[columns[0].key]}')">
                        ${action.icon ? `<i class="${action.icon}"></i>` : ''} ${action.label}
                      </button>
                    `).join('')}
                  </td>
                ` : ''}
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  },

  // Create a blockchain transaction card
  createBlockchainCard(property) {
    if (!property.blockchain.verified) {
      return `
        <div class="card blockchain-card pending">
          <div class="card-body">
            <div class="blockchain-status">
              <i class="fas fa-hourglass-half"></i>
              <h3>Blockchain Verification Pending</h3>
              <p>This transaction will be recorded on the blockchain once all initial verifications are complete.</p>
            </div>
          </div>
        </div>
      `;
    }

    return `
      <div class="card blockchain-card verified">
        <div class="card-header">
          <h3>Blockchain Transaction</h3>
          <span class="verification-badge">
            <i class="fas fa-shield-alt"></i> Verified
          </span>
        </div>
        <div class="card-body">
          <div class="blockchain-details">
            <div class="detail-item">
              <label>Contract Address:</label>
              <code class="blockchain-hash">${property.blockchain.contractAddress}</code>
              <button class="copy-btn" onclick="Portal.copyToClipboard('${property.blockchain.contractAddress}')">
                <i class="fas fa-copy"></i>
              </button>
            </div>
            <div class="detail-item">
              <label>Transaction Hash:</label>
              <code class="blockchain-hash">${property.blockchain.transactionHash}</code>
              <button class="copy-btn" onclick="Portal.copyToClipboard('${property.blockchain.transactionHash}')">
                <i class="fas fa-copy"></i>
              </button>
            </div>
            <div class="detail-row">
              <div class="detail-item">
                <label>Block Number:</label>
                <span>${property.blockchain.blockNumber.toLocaleString()}</span>
              </div>
              <div class="detail-item">
                <label>Gas Used:</label>
                <span>${property.blockchain.gasUsed.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="card-footer">
          <button class="btn btn-primary" onclick="Portal.viewOnBlockchain('${property.blockchain.transactionHash}')">
            <i class="fas fa-external-link-alt"></i> View on Blockchain Explorer
          </button>
        </div>
      </div>
    `;
  },

  // Create notification item
  createNotificationItem(notification) {
    const typeIcons = {
      success: 'fas fa-check-circle',
      warning: 'fas fa-exclamation-triangle',
      error: 'fas fa-exclamation-circle',
      info: 'fas fa-info-circle'
    };

    return `
      <div class="notification-item ${notification.read ? '' : 'unread'}" data-notification-id="${notification.id}">
        <div class="notification-icon ${notification.type}">
          <i class="${notification.icon || typeIcons[notification.type]}"></i>
        </div>
        <div class="notification-content">
          <div class="notification-title">${notification.title}</div>
          <div class="notification-message">${notification.message}</div>
          <div class="notification-time">${notification.time}</div>
        </div>
        ${!notification.read ? `
          <button class="notification-mark-read" onclick="Portal.markNotificationRead(${notification.id})">
            <i class="fas fa-times"></i>
          </button>
        ` : ''}
      </div>
    `;
  },

  // Create a chart container
  createChart(chartId, title, actions = []) {
    return `
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">${title}</h3>
          <div class="chart-actions">
            ${actions.map(action => `
              <button class="btn btn-secondary" onclick="${action.onclick}">
                <i class="${action.icon}"></i>
              </button>
            `).join('')}
          </div>
        </div>
        <div class="card-body">
          <div class="chart-container">
            <canvas id="${chartId}"></canvas>
          </div>
        </div>
      </div>
    `;
  },

  // Create a message thread
  createMessageThread(messages) {
    return `
      <div class="message-thread">
        ${messages.map(msg => `
          <div class="message-item ${msg.read ? 'read' : 'unread'}">
            <div class="message-header">
              <div class="message-from">
                <strong>${msg.from}</strong>
                <span class="message-role">${msg.fromRole}</span>
              </div>
              <div class="message-time">
                ${new Date(msg.timestamp).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            </div>
            <div class="message-subject">${msg.subject}</div>
            <div class="message-content">${msg.message}</div>
            ${msg.attachments && msg.attachments.length > 0 ? `
              <div class="message-attachments">
                <strong>Attachments:</strong>
                ${msg.attachments.map(file => `
                  <a href="#" class="attachment-link">
                    <i class="fas fa-paperclip"></i> ${file}
                  </a>
                `).join(', ')}
              </div>
            ` : ''}
            <div class="message-actions">
              <button class="btn btn-primary" onclick="Portal.replyToMessage(${msg.id})">
                <i class="fas fa-reply"></i> Reply
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  },

  // Create activity feed
  createActivityFeed(activities) {
    return `
      <div class="activity-feed">
        ${activities.map(activity => `
          <div class="activity-item">
            <div class="activity-icon ${activity.type}">
              <i class="${this.getActivityIcon(activity.type)}"></i>
            </div>
            <div class="activity-content">
              <div class="activity-message">${activity.message}</div>
              <div class="activity-time">${activity.time}</div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  },

  // Get activity icon based on type
  getActivityIcon(type) {
    const icons = {
      document_verified: 'fas fa-check-circle',
      stage_progression: 'fas fa-arrow-right',
      new_transaction: 'fas fa-plus-circle',
      document_uploaded: 'fas fa-upload',
      blockchain_update: 'fas fa-cube',
      message_received: 'fas fa-envelope',
      payment_received: 'fas fa-credit-card'
    };
    return icons[type] || 'fas fa-info-circle';
  },

  // Create a modal
  createModal(id, title, content, actions = []) {
    return `
      <div class="modal-backdrop" id="${id}-backdrop">
        <div class="modal" id="${id}">
          <div class="modal-header">
            <h3 class="modal-title">${title}</h3>
            <button class="modal-close" onclick="Portal.closeModal('${id}')">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div class="modal-body">
            ${content}
          </div>
          ${actions.length > 0 ? `
            <div class="modal-footer">
              ${actions.map(action => `
                <button class="btn ${action.class}" onclick="${action.onclick}">
                  ${action.icon ? `<i class="${action.icon}"></i>` : ''} ${action.label}
                </button>
              `).join('')}
            </div>
          ` : ''}
        </div>
      </div>
    `;
  },

  // Create a form field
  createFormField(field) {
    const fieldId = `field-${field.name}`;
    
    switch (field.type) {
      case 'text':
      case 'email':
      case 'password':
        return `
          <div class="form-group">
            <label for="${fieldId}">${field.label} ${field.required ? '*' : ''}</label>
            <input type="${field.type}" id="${fieldId}" name="${field.name}" 
                   ${field.required ? 'required' : ''} 
                   ${field.placeholder ? `placeholder="${field.placeholder}"` : ''}
                   ${field.value ? `value="${field.value}"` : ''}>
          </div>
        `;
      
      case 'textarea':
        return `
          <div class="form-group">
            <label for="${fieldId}">${field.label} ${field.required ? '*' : ''}</label>
            <textarea id="${fieldId}" name="${field.name}" 
                     ${field.required ? 'required' : ''}
                     ${field.placeholder ? `placeholder="${field.placeholder}"` : ''}
                     rows="${field.rows || 4}">${field.value || ''}</textarea>
          </div>
        `;
      
      case 'select':
        return `
          <div class="form-group">
            <label for="${fieldId}">${field.label} ${field.required ? '*' : ''}</label>
            <select id="${fieldId}" name="${field.name}" ${field.required ? 'required' : ''}>
              ${field.options.map(option => `
                <option value="${option.value}" ${option.value === field.value ? 'selected' : ''}>
                  ${option.label}
                </option>
              `).join('')}
            </select>
          </div>
        `;
      
      case 'file':
        return `
          <div class="form-group">
            <label for="${fieldId}">${field.label} ${field.required ? '*' : ''}</label>
            <div class="file-upload">
              <input type="file" id="${fieldId}" name="${field.name}" 
                     ${field.required ? 'required' : ''}
                     ${field.accept ? `accept="${field.accept}"` : ''}
                     ${field.multiple ? 'multiple' : ''}>
              <label for="${fieldId}" class="file-upload-label">
                <i class="fas fa-upload"></i>
                Choose File${field.multiple ? 's' : ''}
              </label>
            </div>
          </div>
        `;
      
      default:
        return '';
    }
  }
};