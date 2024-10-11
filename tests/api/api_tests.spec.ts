import { faker } from '@faker-js/faker/locale/en';
const { expect, test } = require('@playwright/test');
const { loadJsonFile } = require("../../utils/helpers/static_data_loader");

let exportCustomerUrl, 
    submitSurveyUrl,
    autorization,
    customerID, 
    csrfToken,
    cookie,
    basicHeader,
    exportCustomerBody,
    submitSurveyBody,
    submitSurveyHeader;

test.describe('API tests', () => {
    test.beforeAll(async({ })=> {
        exportCustomerUrl = process.env.exportCustomerUrl;
        submitSurveyUrl = process.env.submitSurveyUrl;
        autorization = process.env.autorization;
        customerID = process.env.customerID;
        csrfToken = process.env.csrfToken;
        cookie = process.env.cookie;
        basicHeader = loadJsonFile('utils/headers/basic');
        exportCustomerBody = loadJsonFile('utils/static_data/export_customer_body');
        submitSurveyBody = loadJsonFile('utils/static_data/submit_survey_body');
        submitSurveyHeader = loadJsonFile('utils/static_data/submit_survey_header');

        basicHeader.Authorization =  basicHeader.Authorization + autorization;
        exportCustomerBody.customer_ids.registered = customerID;
    });
    
    test('should response with status code 200 and without errors from exportCustomerUrl', async ({request}) => {
        const reqExportCustUrl = await request.post(exportCustomerUrl, {headers: basicHeader,
            data: exportCustomerBody
           });

        const resExportCustUrl = await reqExportCustUrl.json();

        expect(reqExportCustUrl).toBeOK();
        expect(resExportCustUrl.errors.length).toBe(0);
    });
    
    test('should submit survey sucesfully with valid data', async ({ request }) => {
        const randomMovieName = faker.string.alpha(20);
        submitSurveyBody["question-3"] = randomMovieName;
        submitSurveyBody.csrf_token = csrfToken;
        submitSurveyHeader["cookie"] = cookie; 

        const re1SubmitSurveytUrl = await request.post(submitSurveyUrl, {headers: submitSurveyHeader,
            data: submitSurveyBody
           });

        expect(re1SubmitSurveytUrl).toBeOK()
    });
    
    test('should verify submitted survey', async ({ request }) => {
        const randomMovieName = faker.string.alpha(20);
        submitSurveyBody["question-3"] = randomMovieName;
        submitSurveyBody.csrf_token = csrfToken;
        submitSurveyHeader["cookie"] = cookie; 
        
        await request.post(submitSurveyUrl, {headers: submitSurveyHeader,
            data: submitSurveyBody
           });
    
        const reqExportCustUrl = await request.post(exportCustomerUrl, {headers: basicHeader,
            data: exportCustomerBody
           });
        

        const resExportCustUrl = await reqExportCustUrl.json();

        let found = '';
        for (let i = 0; i < resExportCustUrl.events.length; i++) {
            
            if (resExportCustUrl.events[i].properties.answer == randomMovieName ) {
                found = resExportCustUrl.events[i].properties.answer;
                break;
            }
        }   

        expect(reqExportCustUrl).toBeOK();
        expect(found).toBe(randomMovieName);
    });
})