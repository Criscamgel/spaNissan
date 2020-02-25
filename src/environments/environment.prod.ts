export const environment = {
  production: true,

  /* Options */
  documentos:[    
    {value:null, name:"Selecciona tu tipo de Identificación"},
    {value:1, name:"Cédula de Ciudadanía"},
    {value:2, name:"Cédula de Extranjería"},
    {value:3, name:"NIT"}
   ],

   min: 1200000,
   minF: 20000000,

   ocupaciones:[
    {value:null, name:"Selecciona tu ocupación"},
    {value:1, name:"Pensionado"}, /* 15 */
    {value:11, name:"Empleado"}, /* 16 */
    {value:2, name:"Independiente"} /* 3 */
   ],
  

  /* Regex */
  patternLetter: "^[a-zA-Z áéíóúñÁÉÍÓÚÑ]+$",
  patternNumber: "^[0-9]+$",
  patternMail: RegExp("^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$"),

  /* Urls */
  urlAp: "https://api.premiercredit.co:11445/PremierServices_API_EXT_TST/api/login/authenticate",
  /* urlAp: "https://api.premiercredit.co:11444/PremierServices_API_EXT/api/login/authenticate", */
  urlVp: "https://api.premiercredit.co:11445/PremierServices_API_EXT_TST/api/viabilizacion/getviabilizacion",
  /* urlVp: "https://api.premiercredit.co:11444/PremierServices_API_EXT/api/viabilizacion/getviabilizacion", */

  /* Credentials */
  username: "TuCarro",
  password: "tuC@rr02019"
};
