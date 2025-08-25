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
    },
    'admin': {
      password: 'admin123',
      role: 'admin',
      name: 'System Administrator',
      email: 'admin@propxchain.com',
      company: 'PropXchain Ltd',
      avatar: 'https://ui-avatars.com/api/?name=Admin&background=ef4444&color=fff',
      permissions: ['view_all', 'manage_all', 'system_settings']
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
        { id: 1, name: 'Purchase Agreement', type: 'contract', status: 'verified', uploadDate: '2024-01-16' },
        { id: 2, name: 'Property Survey', type: 'survey', status: 'verified', uploadDate: '2024-01-23' },
        { id: 3, name: 'Mortgage Offer', type: 'financial', status: 'verified', uploadDate: '2024-01-26' },
        { id: 4, name: 'Building Regulations Certificate', type: 'legal', status: 'verified', uploadDate: '2024-01-20' },
        { id: 5, name: 'Energy Performance Certificate', type: 'certificate', status: 'verified', uploadDate: '2024-01-19' },
        { id: 6, name: 'Local Authority Search', type: 'search', status: 'pending', uploadDate: null },
        { id: 7, name: 'Title Deeds', type: 'legal', status: 'under_review', uploadDate: '2024-02-01' }
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
        { id: 8, name: 'Purchase Agreement', type: 'contract', status: 'verified', uploadDate: '2024-01-09' },
        { id: 9, name: 'Property Survey', type: 'survey', status: 'pending', uploadDate: null },
        { id: 10, name: 'Mortgage Application', type: 'financial', status: 'under_review', uploadDate: '2024-01-12' }
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
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=300',
        'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=300'
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
        { stage: 'Offer Accepted', date: '2024-01-12', status: 'completed', icon: 'fas fa-handshake' },
        { stage: 'Initial Verification', date: '2024-01-15', status: 'completed', icon: 'fas fa-check-circle' },
        { stage: 'Survey Ordered', date: '2024-01-18', status: 'action_required', icon: 'fas fa-search' },
        { stage: 'Mortgage Application', date: '2024-01-25', status: 'pending', icon: 'fas fa-university' },
        { stage: 'Legal Review', date: '2024-02-10', status: 'pending', icon: 'fas fa-gavel' },
        { stage: 'Contract Exchange', date: '2024-02-25', status: 'pending', icon: 'fas fa-file-signature' },
        { stage: 'Completion', date: '2024-03-15', status: 'pending', icon: 'fas fa-key' }
      ],
      documents: [
        { id: 11, name: 'Purchase Agreement', type: 'contract', status: 'verified', uploadDate: '2024-01-13' },
        { id: 12, name: 'Property Survey', type: 'survey', status: 'action_required', uploadDate: null },
        { id: 13, name: 'Insurance Documents', type: 'insurance', status: 'pending', uploadDate: null },
        { id: 14, name: 'Service Charge Details', type: 'financial', status: 'verified', uploadDate: '2024-01-16' }
      ]
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
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300',
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=300'
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
        { id: 15, name: 'Purchase Agreement', type: 'contract', status: 'verified', uploadDate: '2023-12-06' },
        { id: 16, name: 'Property Survey', type: 'survey', status: 'verified', uploadDate: '2023-12-14' },
        { id: 17, name: 'Mortgage Offer', type: 'financial', status: 'verified', uploadDate: '2023-12-18' },
        { id: 18, name: 'Building Regulations Certificate', type: 'legal', status: 'verified', uploadDate: '2023-12-10' },
        { id: 19, name: 'Energy Performance Certificate', type: 'certificate', status: 'verified', uploadDate: '2023-12-08' },
        { id: 20, name: 'Local Authority Search', type: 'search', status: 'verified', uploadDate: '2024-01-03' },
        { id: 21, name: 'Title Deeds', type: 'legal', status: 'verified', uploadDate: '2024-01-18' },
        { id: 22, name: 'Final Inspection Report', type: 'inspection', status: 'verified', uploadDate: '2024-02-20' }
      ]
    },
    {
      id: 'PX-2024-005',
      title: 'Victoria Court, Apartment 8B',
      address: '8B Victoria Court, Birmingham B1 2HY',
      type: 'Apartment',
      developer: 'North Wales Developments',
      buyerId: 'jamesbrown',
      buyerName: 'James Brown',
      price: 285000,
      status: 'mortgage_approved',
      progress: 75,
      stage: 'Exchange Pending',
      images: [
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=300',
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300'
      ],
      details: {
        bedrooms: 2,
        bathrooms: 2,
        balcony: true,
        completion: '2024-10-15'
      },
      blockchain: {
        contractAddress: null,
        transactionHash: null,
        blockNumber: null,
        gasUsed: null,
        verified: false
      },
      timeline: [
        { stage: 'Offer Accepted', date: '2024-01-20', status: 'completed', icon: 'fas fa-handshake' },
        { stage: 'Initial Verification', date: '2024-01-22', status: 'action_required', icon: 'fas fa-exclamation-triangle' },
        { stage: 'Survey Ordered', date: '2024-02-05', status: 'pending', icon: 'fas fa-search' },
        { stage: 'Mortgage Application', date: '2024-02-10', status: 'pending', icon: 'fas fa-university' },
        { stage: 'Legal Review', date: '2024-02-25', status: 'pending', icon: 'fas fa-gavel' },
        { stage: 'Contract Exchange', date: '2024-03-15', status: 'pending', icon: 'fas fa-file-signature' },
        { stage: 'Completion', date: '2024-04-01', status: 'pending', icon: 'fas fa-key' }
      ],
      documents: [
        { id: 11, name: 'Purchase Agreement', type: 'contract', status: 'verified', uploadDate: '2024-01-21' },
        { id: 12, name: 'Proof of Funds', type: 'financial', status: 'action_required', uploadDate: null },
        { id: 13, name: 'ID Verification', type: 'identity', status: 'action_required', uploadDate: null }
      ]
    },
    {
      id: 'PX-2024-004',
      title: 'Greenfield Estate, Plot 12',
      address: 'Plot 12, Greenfield Estate, Birmingham B5 7QU',
      type: 'Land',
      developer: 'North Wales Developments',
      buyerId: 'buyer004',
      buyerName: 'David Wilson',
      price: 180000,
      status: 'in_progress',
      progress: 65,
      stage: 'Planning Approval',
      images: [
        'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=300'
      ],
      details: {
        bedrooms: 0,
        bathrooms: 0,
        sqft: 0,
        plotSize: 0.25,
        planningPermission: 'approved',
        completion: '2024-09-30'
      },
      blockchain: {
        contractAddress: '0x962f57fd9eb5c98e5f4d6e8f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0',
        transactionHash: '0x1b3e5d7f9a0c2e4f6a8b0c2d4e6f8a0b2c4d6e8f0a2b4c6d8e0f2a4b6c8d0e2f',
        blockNumber: 18234890,
        gasUsed: 180000,
        verified: true
      },
      timeline: [
        { stage: 'Offer Accepted', date: '2024-01-05', status: 'completed', icon: 'fas fa-handshake' },
        { stage: 'Planning Check', date: '2024-01-08', status: 'completed', icon: 'fas fa-map' },
        { stage: 'Survey Ordered', date: '2024-01-12', status: 'completed', icon: 'fas fa-search' },
        { stage: 'Legal Review', date: '2024-01-18', status: 'in_progress', icon: 'fas fa-gavel' },
        { stage: 'Contract Exchange', date: '2024-02-01', status: 'pending', icon: 'fas fa-file-signature' },
        { stage: 'Completion', date: '2024-02-15', status: 'pending', icon: 'fas fa-key' }
      ],
      documents: [
        { id: 14, name: 'Purchase Agreement', type: 'contract', status: 'verified', uploadDate: '2024-01-06' },
        { id: 15, name: 'Planning Permission', type: 'planning', status: 'verified', uploadDate: '2024-01-07' },
        { id: 16, name: 'Land Survey', type: 'survey', status: 'verified', uploadDate: '2024-01-13' },
        { id: 17, name: 'Environmental Report', type: 'environmental', status: 'verified', uploadDate: '2024-01-15' }
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
      message: 'Local Authority Search document is required to proceed with Harbor View Plaza Unit 1205.',
      type: 'warning',
      time: '15 minutes ago',
      read: false,
      icon: 'fas fa-exclamation-triangle'
    },
    {
      id: 3,
      title: 'Blockchain Verification Complete',
      message: 'Riverside Gardens No. 12 has been successfully recorded on the blockchain.',
      type: 'success',
      time: '1 hour ago',
      read: false,
      icon: 'fas fa-cube'
    },
    {
      id: 4,
      title: 'Transaction Progress',
      message: 'Victoria Court Apartment 8B has progressed to Exchange Pending stage.',
      type: 'info',
      time: '2 hours ago',
      read: true,
      icon: 'fas fa-arrow-right'
    },
    {
      id: 5,
      title: 'Survey Completed',
      message: 'Property survey for Riverside Apartments Unit 301 has been completed successfully.',
      type: 'success',
      time: '3 hours ago',
      read: true,
      icon: 'fas fa-clipboard-check'
    },
    {
      id: 6,
      title: 'New Message',
      message: 'You have a new message from your solicitor regarding contract terms.',
      type: 'info',
      time: '5 hours ago',
      read: true,
      icon: 'fas fa-envelope'
    },
    {
      id: 7,
      title: 'Completion Scheduled',
      message: 'Completion date confirmed for Riverside Gardens - 28th February 2024.',
      type: 'info',
      time: '1 day ago',
      read: true,
      icon: 'fas fa-calendar-check'
    },
    {
      id: 8,
      title: 'Document Upload',
      message: 'Michael Chen has uploaded new insurance documents.',
      type: 'info',
      time: '1 day ago',
      read: true,
      icon: 'fas fa-file-upload'
    },
    {
      id: 9,
      title: 'Payment Confirmed',
      message: 'Deposit payment of £28,500 has been confirmed and secured.',
      type: 'success',
      time: '2 days ago',
      read: true,
      icon: 'fas fa-pound-sign'
    },
    {
      id: 10,
      title: 'System Update',
      message: 'PropXchain portal has been updated with enhanced security features.',
      type: 'info',
      time: '3 days ago',
      read: true,
      icon: 'fas fa-shield-alt'
    }
  ],

  // Analytics data
  analytics: {
    transactionMetrics: {
      totalTransactions: 284,
      activeTransactions: 12,
      completedTransactions: 249,
      averageCompletionTime: 18, // days (improved from traditional 75-90 days)
      totalValue: 89750000, // £89.75M
      monthlyGrowth: 18.7,
      costSavings: 48, // percentage cost reduction
      timeSavings: 76 // percentage time reduction
    },
    
    documentStats: {
      totalDocuments: 1247,
      verifiedDocuments: 1098,
      pendingDocuments: 87,
      actionRequired: 62,
      verificationRate: 88.1,
      blockchainVerified: 1034
    },
    
    recentActivity: [
      { type: 'blockchain_verified', message: 'Harbor View Plaza Unit 1205 verified on blockchain', time: '3 minutes ago', icon: 'fas fa-cube' },
      { type: 'document_verified', message: 'Energy Performance Certificate verified for PX-2024-004', time: '12 minutes ago', icon: 'fas fa-check-circle' },
      { type: 'stage_progression', message: 'Victoria Court 8B moved to Exchange Pending', time: '25 minutes ago', icon: 'fas fa-arrow-right' },
      { type: 'completion_ready', message: 'Riverside Gardens No. 12 ready for completion', time: '1 hour ago', icon: 'fas fa-key' },
      { type: 'new_transaction', message: 'New buyer registered: Sarah Mitchell', time: '2 hours ago', icon: 'fas fa-user-plus' },
      { type: 'document_uploaded', message: 'Insurance documents uploaded for PX-2024-003', time: '3 hours ago', icon: 'fas fa-file-upload' },
      { type: 'payment_confirmed', message: 'Deposit confirmed for Victoria Court Apartment', time: '4 hours ago', icon: 'fas fa-pound-sign' },
      { type: 'smart_contract', message: 'Smart contract deployed for PX-2024-004', time: '5 hours ago', icon: 'fas fa-file-contract' }
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
  },

  // Communication messages
  messages: [
    {
      id: 1,
      from: 'Sarah Johnson',
      fromRole: 'Solicitor',
      to: 'James Brown',
      subject: 'Contract Review - Unit 301',
      message: 'Hi James, I\'ve completed the initial review of your purchase contract. There are a few minor clauses we should discuss. When would be a good time for a call?',
      timestamp: '2024-01-15T10:30:00Z',
      read: false,
      propertyId: 'PX-2024-001',
      attachments: ['contract_amendments.pdf']
    },
    {
      id: 2,
      from: 'Emma Wilson',
      fromRole: 'Developer',
      to: 'James Brown',
      subject: 'Construction Progress Update',
      message: 'Good morning! I wanted to update you on the construction progress of Unit 301. We\'re on schedule for completion and the latest inspection results are attached.',
      timestamp: '2024-01-14T09:15:00Z',
      read: true,
      propertyId: 'PX-2024-001',
      attachments: ['inspection_report_jan2024.pdf', 'progress_photos.zip']
    }
  ],

  // Document types and their requirements
  documentTypes: {
    contract: { label: 'Purchase Contract', required: true, icon: 'fas fa-file-signature' },
    survey: { label: 'Property Survey', required: true, icon: 'fas fa-search' },
    financial: { label: 'Financial Documents', required: true, icon: 'fas fa-university' },
    legal: { label: 'Legal Documents', required: true, icon: 'fas fa-gavel' },
    certificate: { label: 'Certificates', required: false, icon: 'fas fa-certificate' },
    search: { label: 'Property Searches', required: true, icon: 'fas fa-map-search' },
    identity: { label: 'Identity Verification', required: true, icon: 'fas fa-id-card' },
    planning: { label: 'Planning Documents', required: false, icon: 'fas fa-map' },
    environmental: { label: 'Environmental Reports', required: false, icon: 'fas fa-leaf' }
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

  // Calculate days since
  daysSince(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
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

  // Simulate blockchain transaction
  generateBlockchainTx() {
    return {
      hash: '0x' + Array.from({length: 64}, () => Math.floor(Math.random() * 16).toString(16)).join(''),
      block: Math.floor(Math.random() * 1000000) + 18000000,
      gasUsed: Math.floor(Math.random() * 200000) + 100000,
      timestamp: new Date().toISOString()
    };
  }
};