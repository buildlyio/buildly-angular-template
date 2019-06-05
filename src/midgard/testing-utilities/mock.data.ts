// Mock Contact[]
export const mockContacts = [
  {
    id: 1234,
    url: 'http://contact/1',
    title: 'Mr.',
    first_name: 'Bob',
    middle_name: 'Marley',
    last_name: 'Doh',
    addresses: [],
    emails: [{ email: 'test@gmail.com' }],
    phones: [{ number: '356729910101' }],
    uuid: '3782101jdji3038'
  },
  {
    id: 1564,
    url: 'http://contact/145',
    title: 'Mrs.',
    first_name: 'Test',
    middle_name: 'User',
    last_name: 'LastName',
    addresses: [],
    emails: [{ email: 'testuser@gmail.com' }],
    phones: [{ number: '35672349910101' }],
    uuid: '3782101234jdji3038'
  }
];

export const mockMappedContacts = [
  {
    firstLetter: mockContacts[0].last_name.charAt(0).toUpperCase(),
    full_name: `${mockContacts[0].last_name}, ${mockContacts[0].first_name}`,
    firstEmail: mockContacts[0].emails[0].email,
    firstPhone: mockContacts[0].phones[0].number,
    firstAddress: '',
    firstCity: '',
    firstDistrict: '',
    firstPostal: ''
  },
  {
    firstLetter: mockContacts[1].last_name.charAt(0).toUpperCase(),
    full_name: `${mockContacts[1].last_name}, ${mockContacts[1].first_name}`,
    firstEmail: mockContacts[1].emails[0].email,
    firstPhone: mockContacts[1].phones[0].number,
    firstAddress: '',
    firstCity: '',
    firstDistrict: '',
    firstPostal: ''
  }
];

export const mockInstallers = [
  {
    id: 1,
    value: 'https://dev-midgard.walhall.io/api/tolauser/8/',
    label: 'Test User',
    key: 36726,
    uuid: 'abcd12345'
  },
  {
    id: 3,
    value: 'https://dev-midgard.walhall.io/api/tolauser/6/',
    label: 'John Doe',
    key: 367262,
    uuid: 'abcdef12345'
  }
];

// Mock date for CoreUser
export const mockCoreUsers = [
  {
    id: 1234,
    url: 'http://coreuser/124',
    title: 'Mr.',
    name: 'John Doe',
    core_user_uuid: '7389002244'
  },
  {
    id: 12,
    url: 'http://coreuser/12',
    title: 'Mr.',
    name: 'Bob Marley',
    core_user_uuid: '5637890-2'
  }
];
// Mock data for Coregroups
export const mockCoreGroups = [
  {
    name: 'Admin',
    permissions: {
      create: true,
      read: true,
      update: true,
      delete: true
    }
  },
  {
    name: 'ReadOnly',
    permissions: {
      create: false,
      read: false,
      update: false,
      delete: false
    }
  }
];

// Mock data for Documents
export const mockDocuments = [
  {
    id: 4,
    file_type: 'png',
    file_name: 'Test File.png',
    file: null,
    upload_date: new Date(),
    user_uuid: '36789101123',
    workflowlevel2_uuids: ['356891027823439']
  },
  {
    id: 5,
    file_type: 'pdf',
    file_name: 'Test File.pdf',
    file: 'http://file/test1',
    upload_date: new Date(),
    user_uuid: '367891011234',
    workflowlevel2_uuids: ['356891027839']
  }
];

export const documentsMock = [
  {
    'id': 142,
    'uuid': 'f7fece23-30a0-4c42-8daa-98a33b5bfa83',
    'upload_date': '2018-08-01T14:24:16.874316Z',
    'file': 'https://dev-kupfer-documents.k8s.mitgard.io/file/142',
    'file_description': 'test.pdf',
    'file_name': 'speisenplan 1307 18 Sommers (2).pdf',
    'file_type': 'pdf',
    // create_date: '2018-08-01T02:23:34Z',
    'organization_uuid': null,
    'user_uuid': '1be34f80-16a4-48c9-8192-4e9d184f0486',
    'contact_uuid': 'c7772ec3-0da8-4317-8046-dda975d098e5',
    'workflowlevel1_uuids': null,
    'workflowlevel2_uuids': ['63276ee5-93dd-41c1-9278-cd7eefdc28d2'],
    'blobLocalUrl': 'blob:http://localhost:8100/7fb942bc-5d04-4da6-84bd-c11064c3d460'
  },
  {
    'id': 144,
    'uuid': '9afa3435-57a2-4cef-bf8a-bc9ea57b9198',
    'upload_date': '2018-08-03T09:20:40.511372Z',
    'file': 'https://dev-kupfer-documents.k8s.mitgard.io/file/144',
    'file_description': 'ReparaturWrmepumpe_03082018_ScreenSho.png',
    'file_name': 'ReparaturWrmepumpe_03082018_ScreenSho.png',
    'file_type': 'png',
    // create_date: '2018-08-03T09:20:34.007000Z',
    'organization_uuid': null,
    'user_uuid': '1be34f80-16a4-48c9-8192-4e9d184f0486',
    'contact_uuid': '73fb8f84-2357-4a36-83fc-580f8c06d6f1',
    'workflowlevel1_uuids': null,
    'workflowlevel2_uuids': [
      '63276ee5-93dd-41c1-9278-cd7eefdc28d2'
    ],
    'blobLocalUrl': 'blob:http://localhost:8100/e36e5ec4-1018-4c4f-8ef2-e1151c1a1a4b'
  },
  {
    'id': 120,
    'uuid': '9afa3435-57a2-4cef-bf8a-bc9ea57b9198',
    'file': 'https://dev-kupfer-documents.k8s.mitgard.io/file/144',
    'file_description': 'ReparaturWrmepumpe_03082018_ScreenSho.png',
    'file_name': 'ReparaturWrmepumpe_03082018_ScreenSho.png',
    'file_type': 'png',
    'user_uuid': '1be34f80-16a4-48c9-8192-4e9d184f0486',
    'workflowlevel2_uuids': [
      '63276ee5-93dd-41c1-9278-cd7eefdc28d2'
    ],
  }
];

export const documentCreateMock = {
  'upload_date': '2018-08-03T09:20:34.007000Z',
  'file': 'https://dev-kupfer-documents.k8s.mitgard.io/file/144',
  'file_description': 'ReparaturWrmepumpe_03082018_ScreenSho.png',
  'file_name': 'ReparaturWrmepumpe_03082018_ScreenSho.png',
  'create_date': '2018-08-03T09:20:34.007000Z',
  'organization_uuid': 'fasd4214ewrfsd',
  'user_uuid': '1be34f80-16a4-48c9-8192-4e9d184f0486',
  'contact_uuid': '73fb8f84-2357-4a36-83fc-580f8c06d6f1',
  'workflowlevel1_uuids': null,
  'workflowlevel2_uuids': [
    '63276ee5-93dd-41c1-9278-cd7eefdc28d2'
  ]
};

// Mock data for Projects
export const mockProjects = [
  {
    id: 123,
    name: 'Test Project',
    level2_uuid: '356891027839',
    contact: { uuid: 'teyuwioqonsbbdb' }
  },
  {
    id: 124,
    name: 'Test Project 2',
    level2_uuid: '356891027823439',
    contact: { uuid: 'teyuwioqonsbbdb' }
  }
];
