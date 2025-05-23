/**
 * slab-seller-backend API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0-SNAPSHOT
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { HttpHeaders }                                       from '@angular/common/http';

import { Observable }                                        from 'rxjs';

import { PasswordRecoveryRequestDTO } from '../model/models';


import { Configuration }                                     from '../configuration';



export interface EmailResourceServiceInterface {
    defaultHeaders: HttpHeaders;
    configuration: Configuration;

    /**
     * Requests the process for the password recovery
     * Logs the requests and if eligible (user exists and it\&#39;s active, hasn\&#39;t recently sent any other requests) sends the password recovery email to the specified user. Completing the procedure with a 200 return code, does not guarantee an email has been actually sent.
     * @param passwordRecoveryRequestDTO 
     */
    apiV1EmailPasswordrecoveryPost(passwordRecoveryRequestDTO?: PasswordRecoveryRequestDTO, extraHttpRequestParams?: any): Observable<{}>;

}
