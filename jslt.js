let hardCodedValues = { 
  "RegisteredOfficeAddress": {
    "addressCategoryType": "G",
    "addressTypeCode": 162, 
  },
  "PlaceOfBusiness": {
    "addressCategoryType": "G",
    "addressTypeCode": 164, 
  },
  "EmailAddress": {
    "addressCategoryType": "E",
    "addressTypeCode": 170, 
  },
  "MobileAddress": {
    "addressCategoryType": "T",
    "addressTypeCode": 122, 
  }
}
def convert(array) $array|
  if(.)
    let type = .name    
    let extraInfo = get-key($hardCodedValues, $type)
    let addressesAttributes = .addresses.attributes
    {
      "id": .id,
      "type": .name,
      "attributes": {
        "addressCategoryType": $extraInfo.addressCategoryType,
        "addressTypeCode": $extraInfo.addressTypeCode,
        "localityName": $addressesAttributes .City,
        "addressPostcode": $addressesAttributes.PostCode,
        "addressStateCode": $addressesAttributes.RegionCode,
        "addressCountryCode": $addressesAttributes.CountryCode,
        "addressLine1": $addressesAttributes.Line1,
        "addressLine2": $addressesAttributes.Line2,
        // email& mobile attributes        
        "internetEmailAddress": .attributes.Email,
        "phoneNumber": .attributes.Number,
        "countryCallingCode": .attributes.CountryCallingCode,
        "startDate": .attributes.StartDate      
      },
      "oidDigest": hash-int(.)
    }

let targetAddress = [for(.)
  if(is-array(.value)) 
    [for(.value) convert(.)]
  else convert(.value)
]

{ "addresses":  flatten($targetAddress)  }
