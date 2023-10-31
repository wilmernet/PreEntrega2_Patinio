let op;
let logueado= 0;
let user;

//  ============== DATOS ===================
class Donacion{
    constructor(id, tipo, cantidad){
        this.id=id || 0;                // identificador del animal al que dona si el identificador es 0 será para cualquier animal
        this.tipo=tipo || "dinero";     // tipo de donación (dinero o alimento)
        this.cantidad=cantidad || "0";  // cantidad de dinero o kg de alimentos
    }

    toString(){        
            return `${listadoAnimales.find((element)=>element.id==this.id)}\n       ${this.tipo} COP$${this.cantidad}`;
    };
}

class animal{
    constructor(info){
        this.id=info.id;
        this.nombreComun=info.nombreComun;
        this.especie= info.especie;        
        this.sexo= info.sexo;
        this.edad= info.edad;        
    }

    toString(){
        return `ID: ${this.id} - ${this.especie} - ${(this.sexo?"macho":"hembra")} - ${this.edad} años`;
    }
    
}

const listadoAnimales=[
    new animal({id:1,nombreComun:"Danta", especie: "TapirusTerrestris",  sexo:true, edad:1}),
    new animal({id:2,nombreComun:"Danta", especie: "TapirusTerrestris",  sexo:true, edad:2}),
    new animal({id:3,nombreComun:"Danta", especie: "TapirusTerrestris",  sexo:true, edad:3}),
    new animal({id:4,nombreComun:"Mono ahuyador", especie: "Alouatta Seniculus", sexo:false, edad:1}),
    new animal({id:5,nombreComun:"Mono ahuyador", especie: "Alouatta Seniculus", sexo:false, edad:3}),
    new animal({id:6,nombreComun:"Jaguar", especie: "Panthera Onca", sexo:true, edad:2}),
    new animal({id:7,nombreComun:"Jaguar", especie: "Panthera Onca", sexo:true, edad:4}),
    new animal({id:8,nombreComun:"Guacamaya Bandera", especie: "Ara Macao", sexo:false, edad:3}),
    new animal({id:9,nombreComun:"Guacamaya Bandera", especie: "Ara Macao", sexo:true, edad:6}),
    new animal({id:10,nombreComun:"Guacamaya Bandera", especie: "Ara Macao", sexo:true, edad:5}),
    new animal({id:11,nombreComun:"Charapa", especie: "Podocnemis Xpansa",sexo:true, edad:1}),
    new animal({id:12,nombreComun:"Charapa", especie: "Podocnemis Xpansa",sexo:true, edad:2}),
    new animal({id:13,nombreComun:"Charapa", especie: "Podocnemis Xpansa",sexo:true, edad:3}),
    new animal({id:14,nombreComun:"Charapa", especie: "Podocnemis Xpansa",sexo:true, edad:4}),
];

const usuarios=[
    {user:"wilmer", pass:"123abc", donaciones:[], apadrinados:[]},
    {user:"emmy", pass:"124abc", donaciones:[], apadrinados:[]},
    {user:"stefania", pass:"125abc", donaciones:[], apadrinados:[]},
    {user:"salome", pass:"126abc", donaciones:[], apadrinados:[]},
    {user:"santiago", pass:"127abc", donaciones:[], apadrinados:[]}
]

//  ============== FUNCIONES ===================

// ------- ABRIR y CERRAR sesión -----------
const sesion = (log) => {
    if (log == 1) {
        if (confirm("   === SESIÓN ACTIVA ===  \n¿Desea CERRAR la Sesión?")) {
            return 0;
        }
        return 1;
    } else {
        let usuario = prompt("   === INICIO DE SESIÓN ===  \nUsuario:");
        user = usuarios.find((element) => element.user == usuario);
        if (user) {
            usuario = prompt("   === INICIO DE SESIÓN ===  \nContraseña:");
            if (usuario == user.pass) {
                alert("<<< SESION INICIADA CON ÉXITO >>>");
                return 1;
            } else {
                alert("ERROR al validar la contraseña");
            }
        } else {
            alert("ERROR al validar el usuario");
        }
    }
    return 0;
};

// ------- Listar los tipos de animales que hay -----------

let tiposDeAnimal=()=>{
    let tiposDeAnimal=[];
    listadoAnimales.forEach(item=>{
        if(!tiposDeAnimal.some((element)=>element == item.nombreComun)){
            tiposDeAnimal.push(item.nombreComun);
        }
    });    
    return tiposDeAnimal; 
};

// -------- Listar arreglo ------------------

const formatear=(arr)=>{
    let listadoFormateado="";
    for(let i=0; i<arr.length; i++){        
        listadoFormateado+=`${i+1}) ${arr[i]}\n`;
    }
    return listadoFormateado;
};

// -------- Apadrinar un animal ------------------

const apadrinar=(tipoAnimalApadrinado)=>{
    let filtro=listadoAnimales.filter((element)=>(element.nombreComun+"").toUpperCase()==tipoAnimalApadrinado.toUpperCase());
    console.log(filtro);
    if(filtro.length>0){     
        let listado=[];
        for(let i=0; i<filtro.length; i++){
            listado.push(filtro[i]);
        }
        let idSeleccionado=0;
        let texto="Seleccione el ID";
        do{            
            idSeleccionado=prompt(`${texto} del ${filtro[0].nombreComun} que desea apadrinar: \n${formatear(listado)}`)            
            texto="Seleccione un ID válido de la lista de "
        }while(!listado.some((element)=>element.id == idSeleccionado));
        let dinero=prompt(`Ingresa el monto de dinero (USD$) que aportarás mensualmente a tu ${filtro[0].nombreComun} apadrinada(o)`)
        user.donaciones.push(new Donacion(idSeleccionado,"dinero",dinero));                    
        return `Muchas gracias ${user.user} por tu generoso apoyo, ${listadoAnimales.find((element)=>element.id==idSeleccionado)} recibirá con mucha alegría tus USD$${dinero} aportados.`;        
    }
    return `Error: No se encontró este tipo de animales en el CREAS`;
};

// ---------- Modificar información del usuario --------------

const modificarUser=(op)=>{
    switch(op){
        case "1":
            let newUser=prompt("ingresa tu nuevo usuario");
            let pos=usuarios.findIndex((element) => element.user == newUser);                        
            if (pos!=-1){
                alert(`[ERROR: este Nombre de Usuario ya existe]`)
            }else{
                if(confirm(`¿Seguro que desea modificar su usuario por ${newUser}?`)){
                    user.user=newUser;
                    console.log(usuarios);
                }
            }
            break;
        case "2":                        
            if (user.pass==prompt("ingresa tu contraseña actual")){
                let newPass=prompt("Ingrese su nueva contraseña")
                let newPass2=prompt("Confirme su nueva contraseña")
                if(newPass==newPass2){
                    user.pass=newPass;
                }else{
                    alert(`[ERROR: Las contraseñas no coinciden]`)
                }
            }else{
                alert("[ERROR: Contraseña INCORRECTA]")
            }                    
            break;
    }
}


//  ============== PRINCIPAL ===================
do{    
    let onOff= logueado == 1 ? "Cerrar" : "Iniciar";
    op=prompt(`   === MENU ===   \n1. ${onOff} sesión\n2. Apoyanos apadrinando uno de nuestros especímenes\n3. Ver tus aportes\n4. Modificar información del usuario\n5. Salir\nIngresa tu opción`);        
    switch(op){
        case "1":
            logueado=sesion(logueado);     
            break;
        case "2":
            if(logueado==1){                
                alert(apadrinar(prompt(`   === APADRINAR UN ANIMAL ===   \nIngresa el tipo de animal que deseas apadrinar: \n${formatear(tiposDeAnimal())}`)));                
            }else{
                alert("ERROR: se requiere iniciar sesión para ingresar a esta opción")
            }
            break;
        case "3":
            if(logueado==1){
                let listado="";
                let cont=0;
                for(const i of user.donaciones){
                    cont++;
                    listado+=`${cont}) ${i.toString()}\n`;
                }
                alert(`    === VER TUS APORTES ===  \n${listado}`);

            }else{
                alert("ERROR: se requiere iniciar sesión para ingresar a esta opción")
            }
            break;
        case "4":
            if(logueado==1){
                modificarUser(prompt(`    === MODIFICAR TU INFORMACIÓN ===  \n1. Cambiar tu nombre de usuario\n2. Cambiar tu contraseña\n3. Regresar`));                
            }else{
                alert("ERROR: se requiere iniciar sesión para ingresar a esta opción")
            }
            break;
        case "5":            
            if(confirm("¿Desea finalizar la aplicación?")){
                break;
            }
            op="0";
            break;
        default:
            alert(`[ERROR: Opción Invalida]`)
    }
}while(op!="5");




