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

import { SlabDTO } from '../model/models';


import { Configuration }                                     from '../configuration';



export interface ProductResourceServiceInterface {
    defaultHeaders: HttpHeaders;
    configuration: Configuration;

    /**
     * Returns all the available slabs
     * Returns a list containing all available slabs (note: for product types only fetchProductsType will be faster) The customer client must prove it was able to successfully login by validating its token.The header of the request must include a parameter \&quot;Authorization\&quot; with the following value type: \&quot;Bearer JWT_TOKEN\&quot;
     */
    productsAvailabilityGet(extraHttpRequestParams?: any): Observable<Array<SlabDTO>>;

    /**
     * Returns a list of all types of slabs
     * Fetches all types of slabs (note: does not return availability, for that use fetchProductsTypeAndAvailability). The customer client must prove it was able to successfully login by validating its token.The header of the request must include a parameter \&quot;Authorization\&quot; with the following value type: \&quot;Bearer JWT_TOKEN\&quot;
     */
    productsTypeGet(extraHttpRequestParams?: any): Observable<Array<SlabDTO>>;

}