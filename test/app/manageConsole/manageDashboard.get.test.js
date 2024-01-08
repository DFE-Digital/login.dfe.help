jest.mock('./../../../src/infrastructure/config', () => require('../../utils/jestMocks').mockConfig());

const { mockRequest, mockResponse } = require('../../utils/jestMocks');
const { get } = require('../../../src/app/manageConsole/howtoEditServiceConfig');
const { getSingleUserServiceAndRoles, getSingleUserService } = require('../../../src/app/manageConsole/utils');

jest.mock('../../../src/app/manageConsole/utils', () => ({
  getSingleUserServiceAndRoles: jest.fn(),
  getSingleUserService: jest.fn(),
}));
jest.mock('../../../src/infrastructure/access', () => ({
  updateUserService: jest.fn(),
  listRolesOfService: jest.fn(),
  getSingleUserService: jest.fn(),
}));

const res = mockResponse();
describe('when displaying the help page for manageConsole/howtoEditServiceConfig', () => {
  let req;

  beforeEach(() => {
    req = mockRequest({
      user: { sub: 'user1' },
      params: { sid: 'service1' },
      headers: {referer: undefined},
      userServices: {
        serviceId: 'service1',
        userId: 'user1',
        roles: [{ code: 'service1_servicesup' }, { code: 'service1_serviceSup' }, { code: 'service1_accessManage' }, { code: 'service1_onboardSvc' }],
      },
    });

    res.mockResetAll();
    getSingleUserService.mockReset().mockReturnValue({
      userId: 'A76A1DC8-0A38-459B-B2B2-E07767C6438B',
      serviceId: 'B1F190AA-729A-45FC-A695-4EA209DC79D4',
      organisationId: '3DE9D503-6609-4239-BA55-14F8EBD69F56',
      roles: [
        {
          id: '050F4A98-5826-45EB-9ACB-006929990150',
          name: 'DevLocal Interactions - Service Configuration',
          code: '057429C0-0700-4FCC-BDA5-32B5B7CE223F_serviceconfig',
          numericId: '4',
          status: {
            id: 1,
          },
        },
        {
          id: '4A52AC48-C9B0-4922-9B33-0153896636B6',
          name: 'ID only test - Service Configuration',
          code: '9A735214-6648-4B78-83CF-71C8DCD84998_serviceconfig',
          numericId: '21375',
          status: {
            id: 1,
          },
        },
        {
          id: 'D4B455F8-06F4-4DA1-B068-01F884B81F72',
          name: 'DAS Ask Service - Service Configuration',
          code: '896F5C75-2386-450D-B964-93BBCBA9BE67_serviceconfig',
          numericId: '1',
          status: {
            id: 1,
          },
        },
        {
          id: '2EF04235-593D-48D9-8C2F-04A3F5FC8ED3',
          name: 'Assessment Service - Start an assessment - Service Support',
          code: '1A6F09F2-5176-4D7C-8666-C35D6702C6FA_serviceSup',
          numericId: '20924',
          status: {
            id: 1,
          },
        },
        {
          id: '00CDAE87-9AF4-4577-BC58-06328993F950',
          name: 'View Your Education Data (VYED) - Service Configuration',
          code: '500DF403-4643-4CDE-9F30-3C6D8AD27AD7_serviceconfig',
          numericId: '21058',
          status: {
            id: 1,
          },
        },
        {
          id: '1C0489F6-6C7B-428A-972C-07C6EE5A2558',
          name: 'Manage your education and skills funding (MYESF) - Service Configuration',
          code: '4A40415F-1A13-48F4-B54F-0AB0FC0A9AAC_serviceconfig',
          numericId: '21959',
          status: {
            id: 1,
          },
        },
        {
          id: '5AA91A6A-1E49-49D7-A61F-07E0F27CD022',
          name: 'Assessment Service - Manage your school assessments - Service Configuration',
          code: 'BB0EE894-FF73-4BFD-832D-73144843D7EA_serviceconfig',
          numericId: '21015',
          status: {
            id: 1,
          },
        },
        {
          id: '83D9760D-379A-43E3-B35A-0B76D604AEDC',
          name: 'Floyd Client Cred Test - Service Configuration',
          code: '819C314B-663C-4A96-9F69-6A3CBCE37CE1_serviceconfig',
          numericId: '8',
          status: {
            id: 1,
          },
        },
        {
          id: '9031C1A2-CDB3-43ED-87BF-0B9238B7C051',
          name: 'Claim additional payments for teaching - Service Configuration',
          code: '2C75514C-C3E4-40FA-9CAD-3E20699626A0_serviceconfig',
          numericId: '21083',
          status: {
            id: 1,
          },
        },
        {
          id: 'B90FAB54-CFC6-474C-9D77-0C7D0A70CCB5',
          name: 'Analyse School Performance (ASP)  - Service Support',
          code: 'E191B83E-233C-4142-9D4C-DF0454FED8AB_serviceSup',
          numericId: '31',
          status: {
            id: 1,
          },
        },
        {
          id: '24B77226-F8FE-4085-ADB4-0D7DCC12C32E',
          name: 'Assessment Service - Develop an assessment - Service Access Management',
          code: '9626ED78-8997-4737-B3C7-B553B769A93C_accessManage',
          numericId: '20891',
          status: {
            id: 1,
          },
        },
        {
          id: '3749EB0E-C3CB-4372-85B1-0DEA1FE97981',
          name: 'DfE Sign-in - Service Access Management',
          code: '3FD2AE6E-EC3F-47CA-9191-599F401DD897_accessManage',
          numericId: '8',
          status: {
            id: 1,
          },
        },
        {
          id: '348AC7F8-7CD2-43E4-B8FD-11ED7F241962',
          name: 'Analyse School Performance (ASP)  - Service Access Management',
          code: 'E191B83E-233C-4142-9D4C-DF0454FED8AB_accessManage',
          numericId: '33',
          status: {
            id: 1,
          },
        },
        {
          id: '97601FC5-D7B1-4909-98A6-12B81F2BBEA8',
          name: 'Publish teacher training courses - Service Access Management',
          code: 'BD0781F4-04C6-4F7F-A168-83B14984ABBC_accessManage',
          numericId: '16',
          status: {
            id: 1,
          },
        },
        {
          id: 'DE2036F1-0438-46A1-9E25-16B03C89FF62',
          name: 'Get Information about Schools (GIAS) - Service Configuration',
          code: '77D6B281-9F8D-4649-84B8-87FC42EEE71D_serviceconfig',
          numericId: '15',
          status: {
            id: 1,
          },
        },
        {
          id: 'D34A7E0F-783A-40F2-86DA-19D2F1D22D97',
          name: 'DfE Sign-in - Service Configuration',
          code: '3FD2AE6E-EC3F-47CA-9191-599F401DD897_serviceconfig',
          numericId: '6',
          status: {
            id: 1,
          },
        },
        {
          id: 'F3575E60-F70B-41FC-9660-1E6006AA3678',
          name: 'T Level Results and Certification - Service Access Management',
          code: '6EADBBC8-4FB7-4021-9AE2-4270E8805596_accessManage',
          numericId: '20178',
          status: {
            id: 1,
          },
        },
        {
          id: '3A45C606-DB8C-4806-8523-20045B24178C',
          name: 'Hiring Supply Teachers and Agency Workers - Service Access Management',
          code: '00385829-0BC5-47CE-83D6-BADE420AC200_accessManage',
          numericId: '20779',
          status: {
            id: 1,
          },
        },
        {
          id: '8EEAC4F9-6DF0-4031-8C57-23AEB52212DE',
          name: 'OPAFastForm - Service Configuration',
          code: '1029B452-7937-4BAB-A39F-D8C9E67D0E69_serviceconfig',
          numericId: '20575',
          status: {
            id: 1,
          },
        },
        {
          id: 'FE551B42-CB04-4E08-8788-2572F9A3F431',
          name: 'DfE Sign-in Help - Service Banner',
          code: '3A4D1B47-0C6A-4844-81D7-EA502B3656CF_serviceBanner',
          numericId: '21119',
          status: {
            id: 1,
          },
        },
        {
          id: '21132072-B90D-4BDF-9F6F-2612B4116EB2',
          name: 'Publish to the Course Directory - Service Support',
          code: '2F12CEDC-B6DA-4FF1-A34A-471436CD377D_serviceSup',
          numericId: '21286',
          status: {
            id: 1,
          },
        },
        {
          id: '0E0FE4CC-67C2-4004-B215-2A4595553B2C',
          name: 'Publish to the Course Directory - Service Configuration',
          code: '2F12CEDC-B6DA-4FF1-A34A-471436CD377D_serviceconfig',
          numericId: '21285',
          status: {
            id: 1,
          },
        },
        {
          id: 'E44114A2-158F-48B9-9C4B-2B9616C1B09B',
          name: 'Analyse School Performance (ASP)  - Service Configuration',
          code: 'E191B83E-233C-4142-9D4C-DF0454FED8AB_serviceconfig',
          numericId: '28',
          status: {
            id: 1,
          },
        },
        {
          id: '1FDE89D6-EE9D-4274-B128-2D1D5E91E733',
          name: 'Get information about pupils - Service Support',
          code: 'D89818AF-1055-4C0D-B5B6-2244A03D6CCA_serviceSup',
          numericId: '20412',
          status: {
            id: 1,
          },
        },
        {
          id: '7D93F155-094B-45E2-AA73-31DDB29AC051',
          name: 'Publish teacher training courses - Service Support',
          code: 'BD0781F4-04C6-4F7F-A168-83B14984ABBC_serviceSup',
          numericId: '14',
          status: {
            id: 1,
          },
        },
        {
          id: 'BC5A7B72-7F13-494D-826C-34103DF3E967',
          name: 'MYESF Document Exchange - Service Configuration',
          code: 'C032D422-4513-42A4-B2DA-F8B582D2622B_serviceconfig',
          numericId: '20899',
          status: {
            id: 1,
          },
        },
        {
          id: '4AC9D478-C061-4D23-BD1C-3495A7712C79',
          name: 'Teacher Services - Employer Access - Agent - Service Support',
          code: 'DDFA2FA3-9824-4678-A2E0-F34D6D71948E_serviceSup',
          numericId: '32',
          status: {
            id: 1,
          },
        },
        {
          id: 'F43F91F8-BA91-4911-ABC9-39A31D4648BC',
          name: 'MYESF Document Exchange - Service Support',
          code: 'C032D422-4513-42A4-B2DA-F8B582D2622B_serviceSup',
          numericId: '20902',
          status: {
            id: 1,
          },
        },
        {
          id: '7B31B44A-92F7-4F8F-AE00-3D05B5FF329F',
          name: 'Family Hubs: how we are supporting families across the country - Service Configuration',
          code: 'E6DCFB44-AE50-45EE-A324-062CA7842767_serviceconfig',
          numericId: '21494',
          status: {
            id: 1,
          },
        },
        {
          id: 'CC20F548-8364-44C6-82BB-3D39E3AB35F2',
          name: 'Family Hubs: how we are supporting families across the country - Service Support',
          code: 'E6DCFB44-AE50-45EE-A324-062CA7842767_serviceSup',
          numericId: '21497',
          status: {
            id: 1,
          },
        },
        {
          id: '895D4ED4-2A06-437F-9D0D-40A8DB9CBAF5',
          name: 'Get Information About Schools - Service Access Management',
          code: '7BC07A7A-F5EF-4AED-B208-76892A4B4BB1_accessManage',
          numericId: '13',
          status: {
            id: 1,
          },
        },
        {
          id: '382451F7-5D4A-419A-951A-48F6B867B6D0',
          name: 'View Your Education Data (VYED) - Service Support',
          code: '500DF403-4643-4CDE-9F30-3C6D8AD27AD7_serviceSup',
          numericId: '21060',
          status: {
            id: 1,
          },
        },
        {
          id: 'A674F77C-64DF-4DD8-B04B-4B38F9F86F2F',
          name: 'Online Collections Service - including Risk Protection Arrangements - Service Configuration',
          code: 'B45616A1-19A7-4A2E-966D-9E28C99BC6C6_serviceconfig',
          numericId: '20715',
          status: {
            id: 1,
          },
        },
        {
          id: '48081DC6-E778-439C-ABBD-4B90238C0134',
          name: 'DfE Sign-in Help - Service Configuration',
          code: '3A4D1B47-0C6A-4844-81D7-EA502B3656CF_serviceconfig',
          numericId: '21118',
          status: {
            id: 1,
          },
        },
        {
          id: 'B2FF9581-DB8A-4BFD-885B-51340DF01A69',
          name: 'School to School (S2S) - Service Access Management',
          code: 'F9C37D44-66D4-4B32-AF2C-89D59C12D1C5_accessManage',
          numericId: '19',
          status: {
            id: 1,
          },
        },
        {
          id: '7D580D67-B410-45B7-B599-519680F79697',
          name: 'Teacher Services - Appropriate Body - Service Support',
          code: '8FBA5FDE-832B-499B-957E-8BCD97D11B2D_serviceSup',
          numericId: '19',
          status: {
            id: 1,
          },
        },
        {
          id: '82F55DB6-36BA-41B9-8D5B-51AD3F9EFA61',
          name: 'DfE Sign-in Support - Service Banner',
          code: '643CCE45-798A-48D8-865E-6AF9AE72272E_serviceBanner',
          numericId: '9',
          status: {
            id: 1,
          },
        },
        {
          id: 'BD6D549D-7048-449B-9F88-536019E3C8C6',
          name: 'Assessment Service - Manage your school assessments - Service Access Management',
          code: 'BB0EE894-FF73-4BFD-832D-73144843D7EA_accessManage',
          numericId: '21017',
          status: {
            id: 1,
          },
        },
        {
          id: 'FB98EDE8-EDDD-4D3A-A61F-547A9F7B9161',
          name: 'Online Collections Service - including Risk Protection Arrangements - Service Support',
          code: 'B45616A1-19A7-4A2E-966D-9E28C99BC6C6_serviceSup',
          numericId: '20718',
          status: {
            id: 1,
          },
        },
        {
          id: '3EC5D9C4-4463-496B-9185-548F2A13F017',
          name: 'School Experience - Service Configuration',
          code: '146FA38A-2B92-4993-A941-4D6A34053522_serviceconfig',
          numericId: '33',
          status: {
            id: 1,
          },
        },
        {
          id: '3D2F8E0A-7CE8-4C9F-977D-550E9D217AD9',
          name: 'OPAFastForm - Service Access Management',
          code: '1029B452-7937-4BAB-A39F-D8C9E67D0E69_accessManage',
          numericId: '20577',
          status: {
            id: 1,
          },
        },
        {
          id: '4271F9AD-0859-48D9-9DEB-5AA3AC47CC28',
          name: 'Get Information About Schools - Service Configuration',
          code: '7BC07A7A-F5EF-4AED-B208-76892A4B4BB1_serviceconfig',
          numericId: '11',
          status: {
            id: 1,
          },
        },
        {
          id: 'A0A7F1B5-0CEC-4861-8A2A-5B10C194FA16',
          name: 'T Level Data Collection - Service Access Management',
          code: '378ECF43-25BE-470F-84D3-A9EFC3F6B7B2_accessManage',
          numericId: '21041',
          status: {
            id: 1,
          },
        },
        {
          id: '0C4D59AB-E7A4-40E9-ABA2-5C41B51CC77F',
          name: 'T Level Data Collection - Service Configuration',
          code: '378ECF43-25BE-470F-84D3-A9EFC3F6B7B2_serviceconfig',
          numericId: '21040',
          status: {
            id: 1,
          },
        },
        {
          id: 'A3DE3E39-A55C-4C19-A05A-60BB646021BB',
          name: 'Get Information About Schools - Service Access Management',
          code: '2F706180-071A-43BB-A21C-B73F6A8CDAB8_accessManage',
          numericId: '27',
          status: {
            id: 1,
          },
        },
        {
          id: 'CE0B266E-5234-4FE5-89FF-6173CE99E38E',
          name: 'DfE Sign-in - Service Access Management',
          code: '28388AEB-431B-49BC-9480-8DB1B0BDD6E1_accessManage',
          numericId: '22',
          status: {
            id: 1,
          },
        },
        {
          id: '9020DC9B-7B9D-4A6D-BD2E-624A17B1CF92',
          name: 'Get information about pupils - Service Access Management',
          code: 'D89818AF-1055-4C0D-B5B6-2244A03D6CCA_accessManage',
          numericId: '20411',
          status: {
            id: 1,
          },
        },
        {
          id: '90891F59-9434-4D1F-BB8E-65C66E574171',
          name: 'MYESF Document Exchange - Service Access Management',
          code: 'C032D422-4513-42A4-B2DA-F8B582D2622B_accessManage',
          numericId: '20901',
          status: {
            id: 1,
          },
        },
        {
          id: '9636B274-7A80-4955-AE55-6702E44859B3',
          name: 'Assessment Service - Develop an assessment - Service Configuration',
          code: '9626ED78-8997-4737-B3C7-B553B769A93C_serviceconfig',
          numericId: '20889',
          status: {
            id: 1,
          },
        },
        {
          id: 'DA1771D8-2D9D-4417-9E9B-6CB6275E748F',
          name: 'Manage your education and skills funding (MYESF) - Service Support',
          code: '4A40415F-1A13-48F4-B54F-0AB0FC0A9AAC_serviceSup',
          numericId: '21962',
          status: {
            id: 1,
          },
        },
        {
          id: 'C0B85481-4D8F-4628-8402-6E66E28ADF88',
          name: 'Manage Teacher Training Applications - Service Configuration',
          code: '37EFDE7D-FF29-483D-9BDB-FBD4808E2F87_serviceconfig',
          numericId: '21313',
          status: {
            id: 1,
          },
        },
        {
          id: '467A691C-6DDB-4B3A-9C84-710C672AF558',
          name: 'DfE Sign-in - Service Access Management',
          code: 'F3BC432E-5F14-413F-929A-A48D9A781CFF_accessManage',
          numericId: '24',
          status: {
            id: 1,
          },
        },
        {
          id: '7EBD453E-71A4-43AC-82D7-716639E787BF',
          name: 'Manage your education and skills funding (MYESF) - Service Access Management',
          code: '4A40415F-1A13-48F4-B54F-0AB0FC0A9AAC_accessManage',
          numericId: '21961',
          status: {
            id: 1,
          },
        },
        {
          id: '6E441294-745A-4744-943B-71F97ADE6287',
          name: 'Assessment Service - Start an assessment - Service Access Management',
          code: '1A6F09F2-5176-4D7C-8666-C35D6702C6FA_accessManage',
          numericId: '20923',
          status: {
            id: 1,
          },
        },
        {
          id: '94D03AE7-E5AD-40F3-8111-77BDDE245F9F',
          name: 'DfE Sign-in - Service Banner',
          code: '28388AEB-431B-49BC-9480-8DB1B0BDD6E1_serviceBanner',
          numericId: '19',
          status: {
            id: 1,
          },
        },
        {
          id: '86321D39-C62A-4DE5-835B-780028388AEF',
          name: 'Get my Ofsted Inspection Data Summary Report (HTML) - Service Configuration',
          code: 'DC72133B-B9AA-49BF-A48C-A9E33BC4AA7A_serviceconfig',
          numericId: '21244',
          status: {
            id: 1,
          },
        },
        {
          id: '82344B89-5571-4FA1-A09E-788795C55CF6',
          name: 'Teacher Services - Employer Access - Agent - Service Access Management',
          code: 'DDFA2FA3-9824-4678-A2E0-F34D6D71948E_accessManage',
          numericId: '34',
          status: {
            id: 1,
          },
        },
        {
          id: '603178FD-7CA7-4266-8848-7A6A09652225',
          name: 'Assessment Service - Manage your school assessments - Service Support',
          code: 'BB0EE894-FF73-4BFD-832D-73144843D7EA_serviceSup',
          numericId: '21018',
          status: {
            id: 1,
          },
        },
        {
          id: '874AC7F2-0696-4C40-9BC5-7CE09FFD36E8',
          name: 'School 2 School - Service Configuration',
          code: '2A601E0E-96A3-46DC-B493-C47578BDCC34_serviceconfig',
          numericId: '26',
          status: {
            id: 1,
          },
        },
        {
          id: '97E4C7BD-2EB3-4C06-9351-83C6F203B3E5',
          name: 'Claim additional payments for teaching - Service Support',
          code: '2C75514C-C3E4-40FA-9CAD-3E20699626A0_serviceSup',
          numericId: '21085',
          status: {
            id: 1,
          },
        },
        {
          id: 'FBE9D8D2-BEC7-4190-929D-8A00A79F5BAA',
          name: 'NCTL Teacher Services - Service Configuration',
          code: 'B44C452C-5E8F-42D6-BBE2-C79B399320F3_serviceconfig',
          numericId: '27',
          status: {
            id: 1,
          },
        },
        {
          id: 'A85297B0-2AC8-418B-A713-8AE5A037A236',
          name: 'School to School (S2S) - Service Configuration',
          code: 'F9C37D44-66D4-4B32-AF2C-89D59C12D1C5_serviceconfig',
          numericId: '16',
          status: {
            id: 1,
          },
        },
        {
          id: '2C0D8B73-09D6-47AD-99BB-91252F5B0C6D',
          name: 'DfE Sign-in Support - Service Configuration',
          code: '643CCE45-798A-48D8-865E-6AF9AE72272E_serviceconfig',
          numericId: '9',
          status: {
            id: 1,
          },
        },
        {
          id: '96DB43BD-3157-448C-8759-92BCEFECD5DE',
          name: 'Get Information About Schools - Service Configuration',
          code: '2F706180-071A-43BB-A21C-B73F6A8CDAB8_serviceconfig',
          numericId: '23',
          status: {
            id: 1,
          },
        },
        {
          id: '8FA358E6-6CD2-455E-9180-937A3078318A',
          name: 'Publish teacher training courses - Service Configuration',
          code: 'BD0781F4-04C6-4F7F-A168-83B14984ABBC_serviceconfig',
          numericId: '13',
          status: {
            id: 1,
          },
        },
        {
          id: 'EC56CBC6-6C3D-46C7-8DC7-95C60B096D12',
          name: 'Publish to the Course Directory - Service Banner',
          code: '2F12CEDC-B6DA-4FF1-A34A-471436CD377D_serviceBanner',
          numericId: '21284',
          status: {
            id: 1,
          },
        },
        {
          id: 'E69ACF2D-8ACB-4AAA-B25D-96EE91E7A500',
          name: 'DfE Sign-in Help - Service Access Management',
          code: '3A4D1B47-0C6A-4844-81D7-EA502B3656CF_accessManage',
          numericId: '21120',
          status: {
            id: 1,
          },
        },
        {
          id: '5E9A6F05-31ED-41ED-A74F-97539E1B25AB',
          name: 'Register Trainee Teachers - Service Support',
          code: '85FEF736-BDCF-45B8-913D-EEF2C8B7058E_serviceSup',
          numericId: '21134',
          status: {
            id: 1,
          },
        },
        {
          id: '18B49830-C604-4597-B0E3-9756025A87EE',
          name: 'COLLECT - Service Configuration',
          code: '4FD40032-61A6-4BEB-A6C4-6B39A3AF81C1_serviceconfig',
          numericId: '10',
          status: {
            id: 1,
          },
        },
        {
          id: 'F3A981B4-0ADD-4183-805B-9BA0E202B083',
          name: 'Get information about pupils - Service Configuration',
          code: 'D89818AF-1055-4C0D-B5B6-2244A03D6CCA_serviceconfig',
          numericId: '20409',
          status: {
            id: 1,
          },
        },
        {
          id: '158CE6F8-72EA-4FE2-8200-9F8D30848533',
          name: 'Significant Change - Service Access Management',
          code: '67324E57-1E86-46B7-A70F-C3404AC3CAED_accessManage',
          numericId: '21128',
          status: {
            id: 1,
          },
        },
        {
          id: 'F63EFF5E-1459-46D4-BDF6-A35D78E4FB0C',
          name: 'Academy national non-domestic rates (NNDR) claims - Service Access Management',
          code: '808E12C3-4F43-42A6-BC1D-F3801D9B7693_accessManage',
          numericId: '1',
          status: {
            id: 1,
          },
        },
        {
          id: 'D332C468-0B62-4200-9D45-A5B0D7881DDD',
          name: 'Analyse school performance - Service Support',
          code: 'DF2AE7F3-917A-4489-8A62-8B9B536A71CC_serviceSup',
          numericId: '18',
          status: {
            id: 1,
          },
        },
        {
          id: '084A8961-2C5C-411D-B03C-A83A46BAF1C1',
          name: 'Teacher Services - Appropriate Body - Service Access Management',
          code: '8FBA5FDE-832B-499B-957E-8BCD97D11B2D_accessManage',
          numericId: '21',
          status: {
            id: 1,
          },
        },
        {
          id: '9636F758-6867-4542-B645-A9D853CDDA8E',
          name: 'Get Information about Schools (GIAS) - Service Access Management',
          code: '77D6B281-9F8D-4649-84B8-87FC42EEE71D_accessManage',
          numericId: '18',
          status: {
            id: 1,
          },
        },
        {
          id: '00B31D99-C9D6-445B-A012-AC117BD6A2F1',
          name: 'Teacher Services - Appropriate Body - Service Configuration',
          code: '8FBA5FDE-832B-499B-957E-8BCD97D11B2D_serviceconfig',
          numericId: '18',
          status: {
            id: 1,
          },
        },
        {
          id: 'AE344CAF-E3EC-4CDD-BCF3-AC316EFEF69D',
          name: 'DfE Sign-in Help - Service Support',
          code: '3A4D1B47-0C6A-4844-81D7-EA502B3656CF_serviceSup',
          numericId: '21121',
          status: {
            id: 1,
          },
        },
        {
          id: '11525970-525D-47BF-BACA-AE8FE1F6FB89',
          name: 'Get Information About Schools - Service Support',
          code: '7BC07A7A-F5EF-4AED-B208-76892A4B4BB1_serviceSup',
          numericId: '11',
          status: {
            id: 1,
          },
        },
        {
          id: 'EABF5D4C-9AAE-4D03-A51D-B34892D9B3D3',
          name: 'Hiring Supply Teachers and Agency Workers - Service Configuration',
          code: '00385829-0BC5-47CE-83D6-BADE420AC200_serviceconfig',
          numericId: '20778',
          status: {
            id: 1,
          },
        },
        {
          id: '08DB1274-0D33-4AAB-AB9D-B55C3FA03EF3',
          name: 'Family Hubs: how we are supporting families across the country - Service Access Management',
          code: 'E6DCFB44-AE50-45EE-A324-062CA7842767_accessManage',
          numericId: '21496',
          status: {
            id: 1,
          },
        },
        {
          id: '0D940E9F-56E9-4A61-9697-B7D24A8971DB',
          name: 'Register Trainee Teachers - Service Configuration',
          code: '85FEF736-BDCF-45B8-913D-EEF2C8B7058E_serviceconfig',
          numericId: '20751',
          status: {
            id: 1,
          },
        },
        {
          id: 'CC3DBADC-6607-4C2E-9985-BAE625A5E9FE',
          name: 'T Level Results and Certification - Service Support',
          code: '6EADBBC8-4FB7-4021-9AE2-4270E8805596_serviceSup',
          numericId: '20179',
          status: {
            id: 1,
          },
        },
        {
          id: '1154788D-8A03-4F3C-9451-BE1435A211EB',
          name: 'T Level Data Collection - Service Support',
          code: '378ECF43-25BE-470F-84D3-A9EFC3F6B7B2_serviceSup',
          numericId: '21042',
          status: {
            id: 1,
          },
        },
        {
          id: 'D3DE3429-1C73-4663-9046-C02D6579AAE9',
          name: 'COLLECT - Service Access Management',
          code: '98F2AEA3-97AD-4FA8-A248-AFFEAB5E860B_accessManage',
          numericId: '25',
          status: {
            id: 1,
          },
        },
        {
          id: '1B4D5671-F5C3-4ABF-ABA9-C0FA02006138',
          name: 'DAS Ask Service - Service Support',
          code: '896F5C75-2386-450D-B964-93BBCBA9BE67_serviceSup',
          numericId: '1',
          status: {
            id: 1,
          },
        },
        {
          id: '29244971-5842-4906-B47C-C3EE80966A8A',
          name: 'Significant Change - Service Configuration',
          code: '67324E57-1E86-46B7-A70F-C3404AC3CAED_serviceconfig',
          numericId: '21129',
          status: {
            id: 1,
          },
        },
        {
          id: '6D8D89B0-017A-47D0-B53B-C6F5A7A404C4',
          name: 'DfE Sign-in - Service Access Management',
          code: 'A95E7B39-4FB7-44E1-9B9F-76C331104CB0_accessManage',
          numericId: '14',
          status: {
            id: 1,
          },
        },
        {
          id: '200E6AAD-686E-4C84-B340-CE604722E2B1',
          name: 'DfE Sign-in manage - Service Banner',
          code: 'B1F190AA-729A-45FC-A695-4EA209DC79D4_serviceBanner',
          numericId: '1',
          status: {
            id: 1,
          },
        },
        {
          id: '2B67FD5D-3EFD-4481-A555-D2CD84DF5298',
          name: 'Register Trainee Teachers - Service Access Management',
          code: '85FEF736-BDCF-45B8-913D-EEF2C8B7058E_accessManage',
          numericId: '20752',
          status: {
            id: 1,
          },
        },
        {
          id: 'C9CA51D9-67F9-4B6D-A1F6-D3F888B04E45',
          name: 'Teacher Services - Employer Access - Agent - Service Configuration',
          code: 'DDFA2FA3-9824-4678-A2E0-F34D6D71948E_serviceconfig',
          numericId: '29',
          status: {
            id: 1,
          },
        },
        {
          id: 'EDF16E08-AAD8-4778-9105-DAAFA440F360',
          name: 'Claim additional payments for teaching - Service Access Management',
          code: '2C75514C-C3E4-40FA-9CAD-3E20699626A0_accessManage',
          numericId: '21084',
          status: {
            id: 1,
          },
        },
        {
          id: 'B091ACDA-79F0-41E4-A3C8-DAC0A4FD8A04',
          name: 'Online Collections Service - including Risk Protection Arrangements - Service Access Management',
          code: 'B45616A1-19A7-4A2E-966D-9E28C99BC6C6_accessManage',
          numericId: '20717',
          status: {
            id: 1,
          },
        },
        {
          id: '8171CC97-C113-4A20-ADE3-DD1CFCD70153',
          name: 'Teacher Services - Employer Access - Schools - Service Access Management',
          code: 'AA4BD63E-61B8-421F-90DF-8EF2CD15AA38_accessManage',
          numericId: '23',
          status: {
            id: 1,
          },
        },
        {
          id: '8FE72212-FDDD-4F5F-9AC2-E146218D3B3C',
          name: 'T Level Results and Certification - Service Configuration',
          code: '6EADBBC8-4FB7-4021-9AE2-4270E8805596_serviceconfig',
          numericId: '20176',
          status: {
            id: 1,
          },
        },
        {
          id: '32297A92-86D7-449C-8DAF-E24CE843A22A',
          name: 'School Experience - Service Access Management',
          code: '146FA38A-2B92-4993-A941-4D6A34053522_accessManage',
          numericId: '7',
          status: {
            id: 1,
          },
        },
        {
          id: '5924B752-29EE-4100-8923-E39BD0635F59',
          name: 'Analyse school performance - Service Access Management',
          code: 'DF2AE7F3-917A-4489-8A62-8B9B536A71CC_accessManage',
          numericId: '20',
          status: {
            id: 1,
          },
        },
        {
          id: '2523B53B-7B73-4419-96FD-EBC1F025F6AF',
          name: 'Analyse school performance - Service Configuration',
          code: 'DF2AE7F3-917A-4489-8A62-8B9B536A71CC_serviceconfig',
          numericId: '17',
          status: {
            id: 1,
          },
        },
        {
          id: '745914F1-D353-4A2F-B31F-EBC655A741AE',
          name: 'DfE Sign-in - Service Access Management',
          code: '84B30AF0-9E5B-4C9D-B8BF-02F0517ADAB0_accessManage',
          numericId: '2',
          status: {
            id: 1,
          },
        },
        {
          id: '0395F16F-CADB-41A4-BE4D-EC8B0992D012',
          name: 'View Your Education Data (VYED) - Service Access Management',
          code: '500DF403-4643-4CDE-9F30-3C6D8AD27AD7_accessManage',
          numericId: '21059',
          status: {
            id: 1,
          },
        },
        {
          id: '0E8DEE5C-5A7F-479A-A3DA-F36446086CFE',
          name: 'Teacher Services - Employer Access - Schools - Service Support',
          code: 'AA4BD63E-61B8-421F-90DF-8EF2CD15AA38_serviceSup',
          numericId: '21',
          status: {
            id: 1,
          },
        },
        {
          id: 'B56124CE-9320-4BFA-B333-F64723F39F8F',
          name: 'COLLECT - Service Access Management',
          code: '4FD40032-61A6-4BEB-A6C4-6B39A3AF81C1_accessManage',
          numericId: '12',
          status: {
            id: 1,
          },
        },
        {
          id: 'E1CF6DA4-69CE-424D-BBBB-F85445697B5D',
          name: 'Teacher Services - Employer Access - Schools - Service Configuration',
          code: 'AA4BD63E-61B8-421F-90DF-8EF2CD15AA38_serviceconfig',
          numericId: '20',
          status: {
            id: 1,
          },
        },
        {
          id: '9F10C332-ED55-48FC-8463-F9A791246C26',
          name: 'Get Information about Schools (GIAS) - Service Support',
          code: '77D6B281-9F8D-4649-84B8-87FC42EEE71D_serviceSup',
          numericId: '16',
          status: {
            id: 1,
          },
        },
        {
          id: '5A8930C5-F0C4-4ACB-83E5-FA69A4F64853',
          name: 'Manage Teacher Training Applications - Service Access Management',
          code: '37EFDE7D-FF29-483D-9BDB-FBD4808E2F87_accessManage',
          numericId: '21311',
          status: {
            id: 1,
          },
        },
        {
          id: 'FDB05FC8-E901-468E-8954-FB4314DDB23F',
          name: 'DfE Sign-in - Service Banner',
          code: '84B30AF0-9E5B-4C9D-B8BF-02F0517ADAB0_serviceBanner',
          numericId: '2',
          status: {
            id: 1,
          },
        },
        {
          id: 'F9E174F8-2E61-43C5-97ED-FDC7891EB028',
          name: 'School to School (S2S) - Service Support',
          code: 'F9C37D44-66D4-4B32-AF2C-89D59C12D1C5_serviceSup',
          numericId: '17',
          status: {
            id: 1,
          },
        },
        {
          id: 'CBDD97B2-A08F-45CE-B30D-FF7CA961BE70',
          name: 'Get Information About Schools - Service Support',
          code: '2F706180-071A-43BB-A21C-B73F6A8CDAB8_serviceSup',
          numericId: '25',
          status: {
            id: 1,
          },
        },
      ],
      identifiers: [
      ],
      accessGrantedOn: '2023-05-04T10:55:03Z',
    });
    getSingleUserServiceAndRoles.mockReset().mockReturnValue([
      'serviceconfig',
      'serviceSup',
      'accessManage',
    ]);
  });

  it('should render the help page for manageConsole/howToEditServiceConsole', async () => {
    await get(req, res);

    expect(res.render.mock.calls).toHaveLength(1);
    expect(res.render.mock.calls[0][0]).toBe('manageConsole/views/howtoEditServiceConfig');
  });

  it('should include csrf token', async () => {
    await get(req, res);
    expect(res.render.mock.calls[0][1]).toMatchObject({
      csrfToken: 'token',
    });
  });

  it('should include the title', async () => {
    await get(req, res);

    expect(res.render.mock.calls[0][1]).toMatchObject({
      title: 'DfE Manage',
    });
  });
});
