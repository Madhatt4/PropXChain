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
        { stage: 'Offer Accepted', date: '2024-01-15', status: 'completed', icon: 'fas fa-handshake' },
        { stage: 'Initial Verification', date: '2024-01-18', status: 'completed', icon: 'fas fa-check-circle' },
        { stage: 'Survey Ordered', date: '2024-01-22', status: 'completed', icon: 'fas fa-search' },
        { stage: 'Mortgage Application', date: '2024-01-25', status: 'completed', icon: 'fas fa-university' },
        { stage: 'Legal Review', date: '2024-02-01', status: 'in_progress', icon: 'fas fa-gavel' },
        { stage: 'Contract Exchange', date: '2024-02-15', status: 'pending', icon: 'fas fa-file-signature' },
        { stage: 'Completion', date: '2024-03-01', status: 'pending', icon: 'fas fa-key' }
      ],
      documents: [
        { id: 1, name: 'Purchase Agreement', type: 'contract', status: 'verified', uploadDate: '2024-01-16', fileSize: '2.4 MB' },
        { id: 2, name: 'Property Survey Report', type: 'survey', status: 'verified', uploadDate: '2024-01-23', fileSize: '8.7 MB' },
        { id: 3, name: 'Mortgage Offer Letter', type: 'financial', status: 'verified', uploadDate: '2024-01-26', fileSize: '1.2 MB' },
        { id: 4, name: 'Building Regulations Certificate', type: 'legal', status: 'verified', uploadDate: '2024-01-20', fileSize: '856 KB' },
        { id: 5, name: 'Energy Performance Certificate', type: 'certificate', status: 'verified', uploadDate: '2024-01-19', fileSize: '1.1 MB' },
        { id: 6, name: 'Local Authority Search', type: 'search', status: 'pending', uploadDate: null, fileSize: null },
        { id: 7, name: 'Title Deeds', type: 'legal', status: 'under_review', uploadDate: '2024-02-01', fileSize: '3.2 MB' }
      ]
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
      totalTransactions: 284,
      activeTransactions: 12,
      completedTransactions: 249,
      averageCompletionTime: 18,
      totalValue: 89750000,
      monthlyGrowth: 18.7
    },
    documentStats: {
      totalDocuments: 1247,
      verifiedDocuments: 1098,
      pendingDocuments: 87,
      actionRequired: 62,
      verificationRate: 88.1
    },
    recentActivity: [
      { type: 'document_verified', message: 'Survey document verified for PX-2024-001', time: '5 minutes ago' },
      { type: 'stage_progression', message: 'PX-2024-002 moved to Document Review', time: '1 hour ago' },
      { type: 'new_transaction', message: 'New transaction started: PX-2024-003', time: '2 hours ago' }
    ]
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
  }
};