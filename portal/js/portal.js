// PropXchain Portal Main Application

// Debug: Check if PortalData and DataHelpers are loaded
console.log('Portal.js loading...');
console.log('PortalData available:', typeof PortalData !== 'undefined');
console.log('DataHelpers available:', typeof DataHelpers !== 'undefined');

class PropXchainPortal {
  constructor() {
    console.log('PropXchainPortal constructor called');
    this.currentUser = null;
    this.currentPage = 'dashboard';
    this.charts = {};
    console.log('Starting portal initialization...');
    this.init();
  }

  init() {
    console.log('Portal init() called');
    try {
      this.bindEvents();
      console.log('Events bound successfully');
      this.checkExistingSession();
      console.log('Session check completed');
    } catch (error) {
      console.error('Error in portal init:', error);
    }
  }

  bindEvents() {
    // Login form
    document.getElementById('loginForm').addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleLogin();
    });

    // User menu toggle
    document.getElementById('userAvatar').addEventListener('click', () => {
      this.toggleUserDropdown();
    });

    // Notifications
    document.getElementById('notificationsBtn').addEventListener('click', () => {
      this.toggleNotifications();
    });

    document.getElementById('closeNotifications').addEventListener('click', () => {
      this.hideNotifications();
    });

    // Logout
    document.getElementById('logoutBtn').addEventListener('click', () => {
      this.logout();
    });

    // Click outside to close dropdowns
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.user-menu')) {
        this.hideUserDropdown();
      }
      if (!e.target.closest('.notification-panel') && !e.target.closest('#notificationsBtn')) {
        this.hideNotifications();
      }
    });

    // Search functionality
    document.querySelector('.search-bar input').addEventListener('input', (e) => {
      this.handleSearch(e.target.value);
    });
  }

  checkExistingSession() {
    console.log('Checking existing session...');
    
    const username = localStorage.getItem('propx_user');
    const loginTime = localStorage.getItem('propx_login_time');
    const sessionDuration = 30 * 60 * 1000; // 30 minutes

    if (username && loginTime) {
      console.log('Found existing session for:', username);
      const now = new Date().getTime();
      if (now - parseInt(loginTime) < sessionDuration) {
        const user = DataHelpers.getUser(username);
        if (user) {
          console.log('Valid session found, logging in user');
          this.loginUser(user, username);
          return;
        }
      }
    }
    
    console.log('No valid session found, showing login screen');
    this.showLoginScreen();
  }

  handleLogin() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const errorEl = document.getElementById('loginError');

    const user = DataHelpers.getUser(username);
    
    if (user && user.password === password) {
      this.loginUser(user, username);
      this.saveSession(username);
      errorEl.style.display = 'none';
    } else {
      errorEl.style.display = 'block';
      setTimeout(() => {
        errorEl.style.display = 'none';
      }, 3000);
    }
  }

  loginUser(user, username) {
    this.currentUser = { ...user, username };
    this.showPortal();
    this.populateNavigation();
    this.loadDashboard();
  }

  saveSession(username) {
    localStorage.setItem('propx_user', username);
    localStorage.setItem('propx_login_time', new Date().getTime().toString());
  }

  showLoginScreen() {
    console.log('showLoginScreen() called - forcing login display');
    const loginScreen = document.getElementById('loginScreen');
    const portalApp = document.getElementById('portalApp');
    
    if (loginScreen && portalApp) {
      loginScreen.style.display = 'flex';
      portalApp.style.display = 'none';
      console.log('Login screen should now be visible');
    } else {
      console.error('Could not find loginScreen or portalApp elements');
    }
  }

  showPortal() {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('portalApp').style.display = 'block';
    
    // Update user info
    document.getElementById('userName').textContent = this.currentUser.name;
    document.getElementById('userRole').textContent = this.currentUser.role.toUpperCase();
    document.getElementById('userAvatar').src = this.currentUser.avatar;
    document.getElementById('portalType').textContent = `${this.currentUser.role.toUpperCase()} PORTAL`;
    
    // Load notifications
    this.loadNotifications();
  }

  populateNavigation() {
    const nav = DataHelpers.getNavigation(this.currentUser.role);
    const navContainer = document.getElementById('sidebarNav');
    
    navContainer.innerHTML = nav.map(section => `
      <div class="nav-section">
        <div class="nav-section-title">${section.section}</div>
        ${section.items.map(item => `
          <div class="nav-item">
            <a href="#" class="nav-link ${item.active ? 'active' : ''}" 
               onclick="Portal.showPage('${item.id}')">
              <i class="${item.icon}"></i>
              ${item.label}
            </a>
          </div>
        `).join('')}
      </div>
    `).join('');
  }

  loadNotifications() {
    const notificationsList = document.getElementById('notificationList');
    notificationsList.innerHTML = PortalData.notifications
      .map(notification => Components.createNotificationItem(notification))
      .join('');
  }

  showPage(pageId) {
    this.currentPage = pageId;
    this.updateActiveNavigation(pageId);
    
    let content = '';
    let title = pageId.charAt(0).toUpperCase() + pageId.slice(1);
    let actions = '';

    switch (pageId) {
      case 'dashboard':
        title = 'Dashboard';
        content = this.currentUser.role === 'developer' ? 
          Pages.developerDashboard() : Pages.buyerDashboard();
        break;
      
      case 'analytics':
        title = 'Analytics';
        content = Pages.analytics();
        break;
      
      case 'properties':
        title = 'All Properties';
        content = this.showPropertiesPage();
        actions = `
          <button class="btn btn-secondary" onclick="Portal.exportData('properties')">
            <i class="fas fa-download"></i> Export
          </button>
          <button class="btn btn-primary" onclick="Portal.showNewPropertyModal()">
            <i class="fas fa-plus"></i> Add Property
          </button>
        `;
        break;
      
      case 'documents':
        title = 'Document Center';
        content = this.showDocumentsPage();
        break;
      
      case 'communications':
        title = 'Communications';
        content = Pages.communications();
        break;
        
      case 'blockchain':
        title = 'Blockchain View';
        content = this.showBlockchainPage();
        break;
        
      default:
        content = `<div class="empty-state">
          <i class="fas fa-cog"></i>
          <h2>${title} Coming Soon</h2>
          <p>This feature is currently under development.</p>
        </div>`;
    }

    document.getElementById('pageTitle').textContent = title;
    document.getElementById('pageActions').innerHTML = actions;
    document.getElementById('pageContent').innerHTML = content;
    
    // Initialize charts if needed
    setTimeout(() => this.initializeCharts(), 100);
  }

  showPropertiesPage() {
    const properties = DataHelpers.getUserProperties(this.currentUser.username, this.currentUser.role);
    
    return `
      <div class="properties-grid">
        ${properties.map(property => Components.createPropertyCard(property)).join('')}
      </div>
    `;
  }

  showDocumentsPage() {
    let documents = [];
    
    if (this.currentUser.role === 'buyer') {
      const userProperties = DataHelpers.getUserProperties(this.currentUser.username, this.currentUser.role);
      documents = userProperties.length > 0 ? userProperties[0].documents : [];
    } else {
      // Developer sees all documents
      documents = PortalData.properties.flatMap(p => p.documents);
    }

    return `
      <div class="documents-page">
        <div class="documents-stats mb-4">
          <div class="grid grid-cols-4">
            ${Components.createStatCard({
              icon: 'fas fa-file-check',
              label: 'Verified',
              value: documents.filter(d => d.status === 'verified').length,
              color: 'green'
            })}
            ${Components.createStatCard({
              icon: 'fas fa-clock',
              label: 'Under Review',
              value: documents.filter(d => d.status === 'under_review').length,
              color: 'orange'
            })}
            ${Components.createStatCard({
              icon: 'fas fa-exclamation-triangle',
              label: 'Action Required',
              value: documents.filter(d => d.status === 'action_required').length,
              color: 'red'
            })}
            ${Components.createStatCard({
              icon: 'fas fa-upload',
              label: 'Pending Upload',
              value: documents.filter(d => d.status === 'pending').length,
              color: 'blue'
            })}
          </div>
        </div>
        
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">All Documents</h3>
            <button class="btn btn-primary" onclick="Portal.showUploadModal()">
              <i class="fas fa-plus"></i> Upload Document
            </button>
          </div>
          <div class="card-body">
            ${Components.createDocumentList(documents)}
          </div>
        </div>
      </div>
    `;
  }

  showBlockchainPage() {
    const properties = DataHelpers.getUserProperties(this.currentUser.username, this.currentUser.role);
    const verifiedProperties = properties.filter(p => p.blockchain.verified);
    
    return `
      <div class="blockchain-page">
        <div class="blockchain-overview mb-6">
          <div class="grid grid-cols-3">
            ${Components.createStatCard({
              icon: 'fas fa-shield-alt',
              label: 'Verified on Blockchain',
              value: verifiedProperties.length,
              color: 'green'
            })}
            ${Components.createStatCard({
              icon: 'fas fa-cube',
              label: 'Total Blocks',
              value: verifiedProperties.length > 0 ? Math.max(...verifiedProperties.map(p => p.blockchain.blockNumber)).toLocaleString() : '0',
              color: 'blue'
            })}
            ${Components.createStatCard({
              icon: 'fas fa-gas-pump',
              label: 'Total Gas Used',
              value: verifiedProperties.reduce((acc, p) => acc + p.blockchain.gasUsed, 0).toLocaleString(),
              color: 'purple'
            })}
          </div>
        </div>

        <div class="blockchain-transactions">
          ${verifiedProperties.map(property => `
            <div class="card blockchain-transaction mb-4">
              <div class="card-header">
                <h3 class="card-title">${property.title}</h3>
                <span class="verification-badge verified">
                  <i class="fas fa-shield-alt"></i> Blockchain Verified
                </span>
              </div>
              <div class="card-body">
                ${Components.createBlockchainCard(property)}
              </div>
            </div>
          `).join('')}
          
          ${verifiedProperties.length === 0 ? `
            <div class="empty-state">
              <i class="fas fa-cube"></i>
              <h2>No Blockchain Transactions Yet</h2>
              <p>Transactions will appear here once they are verified and recorded on the blockchain.</p>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }

  updateActiveNavigation(pageId) {
    // Remove active class from all nav links
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
    });
    
    // Add active class to current page
    const activeLink = document.querySelector(`[onclick="Portal.showPage('${pageId}')"]`);
    if (activeLink) {
      activeLink.classList.add('active');
    }
  }

  initializeCharts() {
    // Transaction Progress Chart
    const progressCtx = document.getElementById('transactionProgressChart');
    if (progressCtx && !this.charts.transactionProgress) {
      this.charts.transactionProgress = new Chart(progressCtx, {
        type: 'line',
        data: PortalData.analytics.chartData.transactionProgress,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: 'top'
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: 'rgba(0, 0, 0, 0.1)'
              }
            },
            x: {
              grid: {
                display: false
              }
            }
          }
        }
      });
    }

    // Document Status Chart
    const documentCtx = document.getElementById('documentStatusChart');
    if (documentCtx && !this.charts.documentStatus) {
      this.charts.documentStatus = new Chart(documentCtx, {
        type: 'doughnut',
        data: PortalData.analytics.chartData.documentStatus,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom'
            }
          }
        }
      });
    }

    // Analytics charts
    const analyticsTransactionCtx = document.getElementById('analyticsTransactionChart');
    if (analyticsTransactionCtx && !this.charts.analyticsTransaction) {
      this.charts.analyticsTransaction = new Chart(analyticsTransactionCtx, {
        type: 'line',
        data: PortalData.analytics.chartData.transactionProgress,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          elements: {
            point: {
              radius: 6,
              hoverRadius: 8
            }
          }
        }
      });
    }

    const analyticsCompletionCtx = document.getElementById('analyticsCompletionChart');
    if (analyticsCompletionCtx && !this.charts.analyticsCompletion) {
      this.charts.analyticsCompletion = new Chart(analyticsCompletionCtx, {
        type: 'line',
        data: PortalData.analytics.chartData.completionTimes,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: false,
              title: {
                display: true,
                text: 'Days'
              }
            }
          }
        }
      });
    }

    const analyticsDocumentCtx = document.getElementById('analyticsDocumentChart');
    if (analyticsDocumentCtx && !this.charts.analyticsDocument) {
      this.charts.analyticsDocument = new Chart(analyticsDocumentCtx, {
        type: 'pie',
        data: PortalData.analytics.chartData.documentStatus,
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      });
    }
  }

  loadDashboard() {
    this.showPage('dashboard');
  }

  toggleUserDropdown() {
    const dropdown = document.getElementById('userDropdown');
    dropdown.classList.toggle('show');
  }

  hideUserDropdown() {
    const dropdown = document.getElementById('userDropdown');
    dropdown.classList.remove('show');
  }

  toggleNotifications() {
    const panel = document.getElementById('notificationPanel');
    panel.classList.toggle('show');
  }

  hideNotifications() {
    const panel = document.getElementById('notificationPanel');
    panel.classList.remove('show');
  }

  logout() {
    localStorage.removeItem('propx_user');
    localStorage.removeItem('propx_login_time');
    this.currentUser = null;
    
    // Clean up charts
    Object.values(this.charts).forEach(chart => {
      if (chart) chart.destroy();
    });
    this.charts = {};
    
    this.showLoginScreen();
    
    // Clear form
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
  }

  // Utility methods
  viewProperty(propertyId) {
    this.showPage('property-details');
    // In a real app, this would load the specific property
    setTimeout(() => {
      document.getElementById('pageContent').innerHTML = Pages.propertyDetails(propertyId);
    }, 100);
  }

  viewDocuments(propertyId) {
    const property = DataHelpers.getProperty(propertyId);
    if (property) {
      this.showPage('documents');
      // Filter to show only this property's documents
    }
  }

  copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
      this.showToast('Copied to clipboard!', 'success');
    });
  }

  viewOnBlockchain(txHash) {
    // In a real app, this would open the blockchain explorer
    window.open(`https://etherscan.io/tx/${txHash}`, '_blank');
  }

  markNotificationRead(notificationId) {
    const notification = PortalData.notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.read = true;
      this.loadNotifications();
      this.updateNotificationBadge();
    }
  }

  updateNotificationBadge() {
    const badge = document.querySelector('#notificationsBtn .badge');
    const unreadCount = DataHelpers.getUnreadNotificationCount();
    badge.textContent = unreadCount;
    badge.style.display = unreadCount > 0 ? 'block' : 'none';
  }

  showToast(message, type = 'info') {
    // Simple toast notification
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <i class="fas fa-${type === 'success' ? 'check' : 'info'}-circle"></i>
      <span>${message}</span>
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.classList.add('show');
    }, 100);
    
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, 3000);
  }

  handleSearch(query) {
    if (query.length < 2) return;
    
    // Simple search implementation
    console.log('Searching for:', query);
    // In a real app, this would filter content based on the search query
  }

  refreshChart(chartId) {
    if (this.charts[chartId]) {
      // Simulate data refresh
      this.charts[chartId].update();
      this.showToast('Chart refreshed', 'success');
    }
  }

  exportChart(chartId) {
    if (this.charts[chartId]) {
      const url = this.charts[chartId].toBase64Image();
      const link = document.createElement('a');
      link.download = `${chartId}.png`;
      link.href = url;
      link.click();
      this.showToast('Chart exported', 'success');
    }
  }

  exportData(type) {
    // Simulate data export
    this.showToast(`${type} data exported to CSV`, 'success');
  }
}

// Initialize the portal when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM Content Loaded - Initializing PropXchain Portal');
  try {
    window.Portal = new PropXchainPortal();
    console.log('Portal initialized successfully');
  } catch (error) {
    console.error('Error initializing portal:', error);
  }
});

// Add some additional CSS for dynamic elements
const additionalStyles = `
<style>
.property-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.property-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.property-image-container {
  position: relative;
  overflow: hidden;
}

.property-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.property-status {
  position: absolute;
  top: 10px;
  right: 10px;
}

.property-thumbnail {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 4px;
  margin-right: 12px;
}

.progress-cell {
  display: flex;
  align-items: center;
  gap: 8px;
}

.progress-text {
  font-size: 0.8125rem;
  color: var(--gray-600);
  min-width: 35px;
}

.blockchain-card.pending {
  opacity: 0.7;
}

.blockchain-card.verified {
  border-left: 4px solid var(--success);
}

.blockchain-hash {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  background: var(--gray-100);
  padding: 4px 8px;
  border-radius: 4px;
  margin: 0 8px;
}

.copy-btn {
  background: none;
  border: none;
  color: var(--gray-500);
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: var(--transition);
}

.copy-btn:hover {
  background: var(--gray-100);
  color: var(--gray-700);
}

.verification-badge {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  font-size: 0.75rem;
  border-radius: 9999px;
  font-weight: 600;
}

.verification-badge.verified {
  background: rgba(16, 185, 129, 0.1);
  color: var(--success);
}

.toast {
  position: fixed;
  top: 20px;
  right: 20px;
  background: white;
  padding: 12px 16px;
  border-radius: 8px;
  box-shadow: var(--shadow-lg);
  border-left: 4px solid var(--primary);
  display: flex;
  align-items: center;
  gap: 8px;
  transform: translateX(100%);
  transition: transform 0.3s ease;
  z-index: 10000;
}

.toast.show {
  transform: translateX(0);
}

.toast.toast-success {
  border-left-color: var(--success);
}

.toast.toast-error {
  border-left-color: var(--error);
}

.timeline {
  position: relative;
  padding-left: 30px;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 15px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--gray-300);
}

.timeline-item {
  position: relative;
  margin-bottom: 20px;
}

.timeline-marker {
  position: absolute;
  left: -37px;
  top: 0;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  color: white;
  background: var(--gray-400);
}

.timeline-item.completed .timeline-marker {
  background: var(--success);
}

.timeline-item.in_progress .timeline-marker {
  background: var(--primary);
}

.timeline-item.action_required .timeline-marker {
  background: var(--error);
}

.timeline-content {
  background: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: var(--shadow-sm);
}

.timeline-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.timeline-date {
  font-size: 0.875rem;
  color: var(--gray-600);
}

.document-item {
  display: flex;
  align-items: center;
  padding: 16px;
  border: 1px solid var(--gray-200);
  border-radius: 8px;
  margin-bottom: 12px;
  transition: var(--transition);
}

.document-item:hover {
  background: var(--gray-50);
}

.document-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--gray-100);
  border-radius: 8px;
  margin-right: 12px;
  font-size: 1.25rem;
  color: var(--gray-600);
}

.document-info {
  flex: 1;
}

.document-name {
  font-weight: 600;
  margin-bottom: 4px;
}

.document-type {
  font-size: 0.875rem;
  color: var(--gray-600);
}

.document-date {
  font-size: 0.75rem;
  color: var(--gray-500);
  margin-top: 2px;
}

.document-status {
  margin-right: 12px;
}

.document-actions {
  display: flex;
  gap: 8px;
}

.quick-actions {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.action-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 20px;
  background: white;
  border: 2px solid var(--gray-200);
  border-radius: 12px;
  cursor: pointer;
  transition: var(--transition);
  text-decoration: none;
  color: var(--gray-700);
}

.action-btn:hover {
  border-color: var(--primary);
  background: rgba(6, 102, 204, 0.02);
}

.action-btn i {
  font-size: 1.5rem;
  color: var(--primary);
}

.current-stage {
  display: flex;
  align-items: center;
  gap: 16px;
}

.stage-icon {
  width: 60px;
  height: 60px;
  background: var(--primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: white;
}

.stage-progress {
  margin-top: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', additionalStyles);