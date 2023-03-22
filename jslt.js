let hardCodedValues = { 
  "RegisteredOfficeAddress": {
    "addressCategoryType": "G",
    "addressTypeCode": 162, 
    "oidDigest":  "1143470109"  },
  "PlaceOfBusiness": {
    "addressCategoryType": "G",
    "addressTypeCode": 164, 
    "oidDigest":  "457686347"  },
  "EmailAddress": {
    "addressCategoryType": "E",
    "addressTypeCode": 170, 
    "oidDigest":  "-487739423"  },
  "MobileAddress": {
    "addressCategoryType": "T",
    "addressTypeCode": 122, 
    "oidDigest":  "-1415936973"  }
}
def convert(array)
  if($array)
    let type = $array.name    
    let extraInfo = get-key($hardCodedValues, $type)
    {
      "id": $array.id,
      "type": $array.name,
      "attributes": {
        "addressCategoryType": $extraInfo.addressCategoryType,
        "addressTypeCode": $extraInfo.addressTypeCode,
        "localityName": $array.addresses.attributes.City,
        "addressPostcode": $array.addresses.attributes.PostCode,
        "addressStateCode": $array.addresses.attributes.RegionCode,
        "addressCountryCode": $array.addresses.attributes.CountryCode,
        "addressLine1": $array.addresses.attributes.Line1,
        "addressLine2": $array.addresses.attributes.Line2,
        // email& mobile attributes        
        "internetEmailAddress": $array.attributes.Email,
        "phoneNumber": $array.attributes.Number,
        "countryCallingCode": $array.attributes.CountryCallingCode,
        "startDate": $array.attributes.StartDate      },
      "oidDigest": $extraInfo.oidDigest,
    }
// looping through all items
let targetAddress = [for(.)
  // if it is an array of addresses  
  if(is-array(.value)) 
    [for(.value) convert(.)]
  else convert(.value)
]
{ "addresses":  flatten($targetAddress)  }
