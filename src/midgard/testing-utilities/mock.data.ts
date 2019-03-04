
// Mock Appointments
export const mockExistingAppointmentData = {
  id: 3,
  name: 'Existing appointment',
  start_date: '22-11-2018',
  end_date: '22-11-2018',
  workflowlevel2: [ 'fasdfaerqwr' ],
  invitee_uuids: [ 'andrew' ],
  contact_uuid: 'yueiowiuennjdj929',
  notes: 'some notes',
  isNew: true
};

export const mockNewAppointmentData = {
  name: 'New appointment',
  start_date: '25-12-2018',
  end_date: '25-12-2018',
  workflowlevel2: [ 'fasdfaerqwr' ],
  invitee_uuids: [ 'andrew' ],
  contact_uuid: 'yueiowiuennjdj929',
  notes: 'some notes'
};

export const mockInvalidAppointmentData = {
  name: 'Invalid appointment',
  start_date: '',
  end_date: '',
  workflowlevel2: [ 'fasdfaerqwr' ],
  invitee_uuids: [ 'andrew' ],
  contact_uuid: 'yueiowiuennjdj929',
  notes: 'some notes',
};

export const mockAppointmentsForSelectors = [
  {
    id: 4,
    name: 'Installation #4',
    start_date: '2018-10-25T09:00:00+01:00',
    end_date: '2018-10-25T13:00:00+01:00',
    type: ['installation'],
    invitee_uuids: ['andrew'],
    workflowlevel2: ['kupfer'],
    contact_uuid: 'abc123',
  },
  {
    id: 8,
    name: 'Installation #8',
    start_date: '2018-10-25T13:00:00+01:00',
    end_date: '2018-10-25T17:00:00+01:00',
    type: ['installation'],
    invitee_uuids: ['andrew'],
    workflowlevel2: ['kupfer'],
    contact_uuid: 'abc123',
  },
  {
    id: 12,
    name: 'Installation #12',
    start_date: '2018-10-25T16:30:00+01:00',
    end_date: '2018-10-25T17:00:00+01:00',
    type: ['installation'],
    invitee_uuids: ['andrew'],
    workflowlevel2: ['kupfer'],
    contact_uuid: 'abc123',
  },
  {
    id: 16,
    name: 'Installation #16',
    start_date: '2018-10-26T14:30:00+01:00',
    end_date: '2018-10-26T17:00:00+01:00',
    type: ['installation'],
    invitee_uuids: ['andrew'],
    workflowlevel2: ['kupfer'],
    contact_uuid: 'abc123',
  }
];

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

// Mock Appointment
export const mockAppointments = [
  {
    id: 201,
    name: 'Joe',
    start_date: '06/15/2018',
    end_date: '06/15/2018',
    type: ['test'],
    address: 'Test Address 288210',
    invitee_uuids: [],
    workflowlevel2: ['fads3424WRFaw45'],
    notes: 'Just a test note',
    contact_uuid: 'abcd12345'
  },
  {
    id: 301,
    name: 'Joe',
    start_date: '07/02/2018',
    end_date: '07/02/2018',
    type: ['type'],
    address: 'Test Address 288212340',
    invitee_uuids: ['abcd12345'],
    notes: 'Just a test secondnote'
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

// Mock mockAppointment2Installer
export const mockAppointment2Installer = {
    id: 201,
    apiId: 201,
    text: 'Joe',
    start_date: '06/15/2018 00:00',
    end_date: '06/15/2018 00:00',
    installers: [36726, 367262],
    operationType: ['test'],
    address: 'Test Address 288210',
    notes: 'Just a test note'
};


export const mockTimeTrackingEvents = [
  {
    'id': 12,
    'appointment_id': 1,
    'workflowlevel2': [
      {
        'uuid': '123a-567a-901a',
        'name': 'Project1',
        'type': 'Maintenance',
      }
    ],
    'invitees': [
      {
        'uuid': '5b5f558c-203a-4539-8256-5679f22b719a',
        'first_name': 'Andres',
        'middle_name': '',
        'last_name': 'Scholz'
      },
    ],
    'contact': {
      'uuid': '1be34f80-16a4-48c9-8192-4e9d184f0486',
      'first_name': 'John',
      'middle_name': 'Father',
      'last_name': 'Misty'
    },
    'type': [
      'Maintenance'
    ],
    'start_date': '2018-07-23T11:00:00+02:00',
    'end_date': '2018-07-23T13:35:50+02:00',
    'time_event': {
      'time_logged_seconds': '3200'
    }
  },
  {
    'id': 4,
    'appointment_id': 1,
    'workflowlevel2': [
      {
        'uuid': '123a-567a-901a',
        'name': 'Project2',
      }
    ],
    'invitees': [
      {
        'uuid': '1be34f80-16a4-48c9-8192-4e9d184f0486',
        'first_name': 'Alex',
        'middle_name': '',
        'last_name': 'Fernandez'
      },
      {
        'uuid': '5b5f558c-203a-4539-8256-5679f22b719a',
        'first_name': 'Andres',
        'middle_name': '',
        'last_name': 'Scholz'
      }
    ],
    'contact': {
      'uuid': '1234-5678-9012',
        'first_name': 'Aziz',
        'middle_name': 'Father',
        'last_name': 'Haddad'
    },
    'type': [
      'Maintenance'
    ],
    'start_date': '2018-07-25T11:00:00+02:00',
    'end_date': '2018-07-25T14:10:00+02:00',
    'time_event': {
      'time_logged_seconds': '6200',
    }
  },
  {
    'id': 6,
    'appointment_id': 1,
    'workflowlevel2': [
      {
        'uuid': '123a-567a-901a',
        'name': 'Project3',
      }
    ],
    'invitees': [
      {
        'uuid': '1be34f80-16a4-48c9-8192-4e9d184f0486',
        'first_name': 'Alex',
        'middle_name': 'haha',
        'last_name': 'Fernandez'
      },
    ],
    'contact': {
      'uuid': '1234-5678-9012',
      'first_name': 'Test',
      'middle_name': 'aa',
      'last_name': 'Haddad'
    },
    'type': [
      'Visit'
    ],
    'start_date': '2018-07-25T13:00:00+02:00',
    'end_date': '2018-07-25T16:00:00+02:00',
    'time_event': {
      'time_logged_seconds': '1800',
    }
  },
  {
    'id': 9,
    'appointment_id': 1,
    'workflowlevel2': [
      {
        'uuid': '123a-567a-901a',
        'name': 'Project3',
      }
    ],
    'invitees': [
      {
        'uuid': '1be34f80-16a4-48c9-8192-4e9d184f0486',
        'first_name': 'Alex',
        'middle_name': 'haha',
        'last_name': 'Fernandez'
      },
    ],
    'contact': {
      'uuid': '1234-5678-9012',
      'first_name': 'Test',
      'middle_name': 'aa',
      'last_name': 'Haddad'
    },
    'type': [
      'Reparation'
    ],
    'start_date': '2018-07-25T16:00:00+02:00',
    'end_date': '2018-07-25T16:30:00+02:00',
    'time_event': {
      'time_logged_seconds': '7200',
    }
  },
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

// Mock date for TolaUser
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
