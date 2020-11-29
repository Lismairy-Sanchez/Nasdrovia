const router = require("express").Router();
const { Usuario, Carrito, Producto, LineaDeOrden, Userdata } = require("../db.js");
const { isAuthenticated, isAuthenticatedAndAdmin } = require("./middlewares");
const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;
const mailgun = require("mailgun-js");
const userData = require("../models/userData.js");
const DOMAIN = "sandbox396137037a674502865965b3ae0e95d0.mailgun.org";
const mg = mailgun({
  apiKey: "4e1388898d6578304533bdde9d4cdca0-53c13666-92f2a20e",
  domain: DOMAIN,
});
router.post("/", async (req, res, next) => {
  let { nombre, email, password } = req.body;
  if (nombre && email && password) {
    let emailExistente = await Usuario.findOne({ where: { email: email } });
    if (emailExistente) {
      res.status(400).json({ Error: "Email ya registrado" });
    } else {
      let nuevo_usuario = await Usuario.create({
        nombre,
        email,
        password: password,
      });
      res.status(201).json(nuevo_usuario);
    }
  } else {
    res
      .status(400)
      .json({ Error: "Faltan parametros todos son requeridos excepto el rol" });
  }
});

router.put("/:id", isAuthenticated, async (req, res, next) => {
  // To-Do:  Mejorar ni riot se animo a tanto, pero funciona
  let id = req.params.id;
  let { nombre, rol, email, contrasena } = req.body;
  if (nombre || email || contrasena || rol) {
    //Almenos un dato me mandan
    if (email) {
      //Quieren actualizar el campo email
      //Busco el email
      let emailExistente = await Usuario.findOne({ where: { email: email } });
      if (emailExistente) {
        //El email existe en la db
        if (emailExistente.id == id) {
          //El email era el mismo del usuario a actualizar
          await Usuario.update(
            {
              name: nombre,
              rol,
              email,
              password: contrasena,
            },
            {
              where: {
                id: id,
              },
            }
          );
          res.status(201).send("Actualizado con exito");
        } else {
          //El email existe y no es el mio
          res.status(400).json({ Error: "Email ya en uso" });
        }
      } else {
        //El email no existia en la db
        await Usuario.update(
          {
            name: nombre,
            rol,
            email,
            password: contrasena,
          },
          {
            where: {
              id: id,
            },
          }
        );
        res.status(201).send("Actualizado con exito");
      }
    } else {
      //No enviaron el campo email no hago ningun checkeo y actualizo
      await Usuario.update(
        {
          name: nombre,
          rol,
          email,
          password: contrasena,
        },
        {
          where: {
            id: id,
          },
        }
      );
      res.status(201).send("Actualizado con exito");
    }
  } else {
    //Por si no se envia ningun parametro a actualizar
    res.status(400).json({ Error: "Faltan parametros envia almenos uno" });
  }
});

router.get("/", (req, res) => {
  Usuario.findAll()
    .then((usuarios) => res.send(usuarios))
    .catch((err) => {
      return res.status(400).send(err);
    });
});
router.get("/:id", (req, res) => {
  let id = req.params.id;
  Usuario.findOne({ where: { id: id } })
    .then((usuario) => {
      !!usuario ? res.send(usuario) : res.json({ Error: "Usuario no existe" });
    })
    .catch((err) => {
      return res.status(400).send(err);
    });
});
router.delete("/:id", (req, res) => {
  let { id } = req.params;
  Usuario.destroy({ where: { id } })
    .then((response) => {
      if (response === 0) res.status(400);
      else res.status(201).send("borrado");
    })
    .catch((err) => res.status(400).send(err.message));
});

router.post("/askForPasswordReset", async (req, res) => {
  const { email } = req.body;
  let salt = await Usuario.generateSalt();
  let usuario = await Usuario.findOne({ where: { email: email } });
  if (!usuario) {
    return res.status(204).send("No hay usuarios registrados con ese email");
  }
  usuario.resetToken = salt;
  //10 minutos dura el token
  usuario.tokenLife = Date.now() + 600000;
  usuario.save();
  const data = {
    from: "Nasdrovia <support@nasdrovia.com>",
    to: email,
    subject: "Solicitud de cambio de contraseña",
    html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml"
  xmlns:v="urn:schemas-microsoft-com:vml"
  xmlns:o="urn:schemas-microsoft-com:office:office">
  <head>
  <title>Nasdrovia</title>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0 " />
  <meta name="format-detection" content="telephone=no"/>
  <!--[if !mso]><!-->
  <link href="https://fonts.googleapis.com/css?family=Lato:100,100i,300,300i,400,700,700i,900,900i" rel="stylesheet" />
  <!--<![endif]-->
  <style type="text/css">
  body {
    margin: 0;
    padding: 0;
    -webkit-text-size-adjust: 100% !important;
    -ms-text-size-adjust: 100% !important;
    -webkit-font-smoothing: antialiased !important;
  }
  img {
    border: 0 !important;
    outline: none !important;
  }
  p {
    Margin: 0px !important;
    Padding: 0px !important;
  }
  table {
    border-collapse: collapse;
    /* mso-table-lspace: 0px;
    mso-table-rspace: 0px; */
  }
  td, a, span {
    border-collapse: collapse;
    /* mso-line-height-rule: exactly; */
  }
  </style>
  <link href="https://fonts.googleapis.com/css2?family=Lobster&display=swap" rel="stylesheet">
  </head>
  <body class="em_body" style="margin:0px auto; padding:0px;" bgcolor="#015386">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" class="em_full_wrap" align="center"  bgcolor="#015386">
      <tr>
        <td align="center" valign="top"><table align="center" width="650" border="0" cellspacing="0" cellpadding="0" class="em_main_table" style="width:650px; table-layout:fixed;">
            <tr>
              <td align="center" valign="top" style="padding:0 25px;" class="em_aside10"><table width="100%" border="0" cellspacing="0" cellpadding="0" align="center">
                <tr>
                  <td height="26" style="height:26px;" class="em_h20">&nbsp;</td>
                </tr>
              
                <tr>
                  <td height="28" style="height:28px;" class="em_h20"></td>
                </tr>
              </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
  </table>
  <table width="100%" border="0" cellspacing="0" cellpadding="0" class="em_full_wrap" align="center" bgcolor="#015386">
      <tr>
        <td align="center" valign="top"><table align="center" width="650" border="0" cellspacing="0" cellpadding="0" class="em_main_table" style="width:650px; table-layout:fixed; background-color:#563488;">
            <tr>
              <td align="center" valign="top" style="padding:0 25px; background-color:#015386;" bgcolor="#015386" class="em_aside10">
              <table width="100%" border="0" cellspacing="0" cellpadding="0" align="center" >
  
                <tr>
                  <td class="em_blue em_font_22" align="center" valign="top" style="font-family: Arial, sans-serif; font-size: 26px; line-height: 29px; color:#264780; font-weight:bold;"></td>
                </tr>
                <tr>
                  <td height="22" class="em_h20" style="height:22px; font-size:0px; line-height:0px;">&nbsp;</td>
                </tr>
                <tr>
                  <td align="center" height="22" class="em_h20" style="height:22px; font-size:0px; line-height:0px;"><img src="https://i.pinimg.com/564x/ac/de/80/acde80ebc88d4dda88b10f7697cef890.jpg"  width="250" height="250" align="center"></td>
                </tr>
                <tr>
                  <td height="22" class="em_h20" style="height:22px; font-size:0px; line-height:0px;">&nbsp;</td>
                </tr>
                <tr>
                  <td valign="top" align="left" bgcolor="#f2effb" style="padding-left:25px; padding-right:35px; background-color:#015386;" class="em_aside10">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" align="left" >
                        <tr>
                          <td height="22" style="height:22px;" class="em_h20">&nbsp;</td>
                        </tr>
                        <tr>
                          <td class="em_blue em_center" align="center" valign="top" style="font-family: Arial, sans-serif; font-size: 40px; line-height: 24px; color:#ffffff; font-weight:bold;">¡Hola ${usuario.nombre}!</td>
                        </tr>
                         <tr>
                            <tr>
                  <td height="22" class="em_h20" style="height:22px; font-size:0px; line-height:0px;">&nbsp;</td>
                </tr>
                          <td class="em_blue em_center" align="justify" valign="top" style="font-family: Arial, sans-serif; font-size: 16px; line-height: 28px; color:#ffffff; font-weight:bold;">Para finalizar el cambio de tu contraseña, debes hacer click aquí.</td>
                       
                        <tr>
                          <td height="16" style="height:16px; font-size:1px; line-height:1px;">&nbsp;</td>
                        </tr>
                        <tr>
                          <td height="16" style="height:16px; font-size:1px; line-height:1px;">&nbsp;</td>
                        </tr>
                        <tr>
                          <td align="rigth" valign="top">
                          <table width="140" border="0" cellspacing="0" cellpadding="0" align="center" style="width:140px;" class="em_wrapper" >
                            <tr>
                              <td valign="top" align="center">
                                <table width="140" style="width:140px; background-color:#d30208; border-radius:4px;" border="0" cellspacing="0" cellpadding="0" align="rigth" bgcolor="#d30208">
                            <tr>
                              <td class="em_white" height="34" align="center" valign="middle" style="font-family: Arial, sans-serif; font-size: 13px; color:#ffffff; font-weight:bold; height:34px;"><a href=http://localhost:3000/passwordReset/${salt} target="_blank" style="text-decoration:none; color:#ffffff; line-height:34px; display:block;">Resetear</a></td>
                            </tr>
                          </table>
                              </td>
                            </tr>
                          </table>
                          </td>
                        </tr>
                        <tr>
                          <td height="26" style="height:26px;" class="em_h20">&nbsp;</td>
                        </tr>
                      </table>
                  </td>
                </tr>
  
              </table>
              </td>
            </tr>
            <tr>
              <td height="20" class="em_h10" bgcolor="#c3b9c6" style="height:20px; font-size:1px; line-height:1px; background-color:#015386;"></td>
            </tr>
            <tr>
              <td>
             
  
  <table width="100%" border="0" cellspacing="0" cellpadding="0" class="em_full_wrap" align="center" bgcolor="#ffffff" >
      <tr>
        <td align="center" valign="top">
            <table align="center" width="650" border="0" cellspacing="0" cellpadding="0" class="em_main_table" style="width:650px; table-layout:fixed; background-color:#015386;">
            <tr>
              <td align="center" valign="top"><table border="0" cellspacing="0" cellpadding="0" align="center">
                  <tr>
                    <td width="12" align="left" valign="middle" style="font-size:0px; line-height:0px; width:12px;"><a href="#" target="_blank" style="text-decoration:none;"></a></td>
                    <td width="7" style="width:7px; font-size:0px; line-height:0px;" class="em_w5">&nbsp;</td>
                <td class="em_grey em_font_11" align="left" valign="middle" style="font-family: Arial, sans-serif; font-size: 16px; line-height: 28px; color:#ffffff; font-weight:bold;""><a href="#" target="_blank" style="text-decoration:none; color:#171714;"></a>¡Siguenos en nuestras redes sociales!</td>
              <td align="center" valign="top" style="padding:0 25px;" class="em_aside10">
                  <table width="100%" border="0" cellspacing="0" cellpadding="0" align="center">
                <tr>
                  <td height="20" style="height:20px;" class="em_h20"></td>
                </tr>
                <tr>
                  <td align="rigth" valign="top">
                      <table border="0" cellspacing="0" cellpadding="0" align="rigth">
                      <tr>
                        <td width="30" style="width:30px;" align="rigth" valign="middle"><a href="http://twitter.com" target="_blank" style="text-decoration:none;"><img src="https://i.imgur.com/bZTF6DN.png" width="30" height="30" alt="Fb" border="0" style="display:block; font-family:Arial, sans-serif; font-size:18px; line-height:25px; text-align:center; color:#000000; font-weight:bold; max-width:30px;" /></a></td>
                        <td width="12" style="width:12px;">&nbsp;</td>
                        <td width="30" style="width:30px;" align="rigth" valign="middle"><a href="http://whatsapp.com" target="_blank" style="text-decoration:none;"><img src="https://i.imgur.com/Mm13dmd.png" width="30" height="30" alt="Wh" border="0" style="display:block; font-family:Arial, sans-serif; font-size:14px; line-height:25px; text-align:center; color:#000000; font-weight:bold; max-width:30px;" /></a></td>
                        <td width="12" style="width:12px;">&nbsp;</td>
                        <td width="30" style="width:30px;" align="rigth" valign="middle"><a href="https://www.instagram.com/nasdroviabeerstore/" target="_blank" style="text-decoration:none;"><img src="https://i.imgur.com/nqySgMj.png" width="30" height="30" alt="Wh" border="0" style="display:block; font-family:Arial, sans-serif; font-size:14px; line-height:25px; text-align:center; color:#000000; font-weight:bold; max-width:30px;" /></a></td>
                        <td width="12" style="width:12px;">&nbsp;</td>
                        <td width="30" style="width:30px;" align="rigth" valign="middle"><a href="https://www.facebook.com/nasdrovia.beerstore.9" style="text-decoration:none;"><img src="https://i.imgur.com/H7OZp6t.png" width="28" height="28" alt="Email" border="0" style="display:block; font-family:Arial, sans-serif; font-size:14px; line-height:25px; text-align:center; color:#000000; font-weight:bold; max-width:30px;" /></a></td>
                      </tr>
                    </table>
                   </td>
                </tr>
                <tr>
                  <td height="16" style="height:16px; font-size:1px; line-height:1px; height:16px;">&nbsp;</td>
                </tr>
                             <tr>
                  <td height="10" style="height:10px; font-size:1px; line-height:1px;">&nbsp;</td>
                </tr>
                <tr>
                  <td align="center" valign="top" style="font-size:0px; line-height:0px;"><table border="0" cellspacing="0" cellpadding="0" align="center">
                  <tr>
                  </tr>
                  </table>
                  </td>
                </tr>
                  <tr>
                 
                    </tr>
                  </table>
                  </td>
                </tr>
      
                <tr>
                  <td height="16" style="font-size:0px; line-height:0px; height:16px;">&nbsp;</td>
                </tr>
              </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
  </table>
  </body>
  </html>`,
  };
  mg.messages().send(data, function (error, body) {
    if (error) {
      res.status(400).json({ Error: error });
    }
  });
  res.status(200).json({ "Recovery token sended to": email});
});

router.post("/passwordReset", async (req, res) => {
  const { password, token } = req.body;
  if (!password || !token) return res.status(400).send("Faltan parámetros");
  const usuario = await Usuario.findOne({
    where: {
      resetToken: token,
      tokenLife: {
        [Op.gte]: Date.now(),
      },
    },
  });
  if (!usuario)
    return res
      .status(204)
      .json({ Error: "Usuario no encontrado o token expirado" });

  usuario.password = password;
  usuario.resetToken = null;
  usuario.tokenLife = null;
  usuario.save();
  res.status(200).json({ Success: "Contraseña actualizada" });
});
/* -------------------CARRITO------------------ */

//AÚN ESTÁN EN PROCESO
//Crear el carro
router.post("/:idUser/cart", async (req, res) => {
  let id = req.params.idUser;
  const item = await Carrito.findOne({
    where: { usuarioId: id, estado: "carrito" },
  });

  if (item) return res.status(400).send("El usuario tiene un carrito");

  let compras = await Carrito.create({
    usuarioId: id,
  });

  res.status(200).json(compras);
});

//Obtener items del carrito
router.get("/:idUser/cart", (req, res) => {
  const { idUser } = req.params;

  Carrito.findOne({
    where: { usuarioId: idUser, estado: "carrito" },
    include: [{ model: LineaDeOrden },{model:Producto}],
  }).then((item) => {
    if (!item) return res.status(204).json("El carrito se encuentra vacio");
    else return res.status(200).send(item);
  });
});

//Vaciar carrito
router.delete("/:idUser/cart", async (req, res) => {
  const id = req.params.idUser;
  let compras = await Carrito.findOne({
    where: { usuarioId: id, estado: "carrito" },
  });
  let deleting = await LineaDeOrden.destroy({
    where: { carritoId: compras.id },
  });
  res.status(200).json({ deleted: "ok" });
});

//Agregar datos del usuario
router.post("/datos/:id",async (req,res)=>{
  let {id} = req.params;
  let {nombre, apellido, documento, ciudad, pais , telefono, direccion, departamento} = req.body
  let checkPrevius = await Userdata.findOne({
    where: { usuarioId: id }
  })
  if(checkPrevius){
    res.status(204).json({"Error":"Ya tenemos los datos, mejor intenta actualizarlos"})
  }else{
  let newData = await Userdata.create({
    usuarioId: id,
    nombre,
    apellido,
    documento,
    ciudad,
    pais,
    telefono,
    direccion,
    departamento
  });
  res.status(200).json({"Ok":"datos agregados con exito", "data, para testeo borrar pliz":newData})
}
})  
//Modificarlos
router.put("/actualizar-datos/:id",async (req,res)=>{
  let {id} = req.params;
  let {nombre, apellido, documento, ciudad, pais , telefono, direccion, departamento} = req.body
  let exist = await Userdata.findOne({
    where: { usuarioId: id }
  })
  if(exist){
    res.status(204).json({"Error":"Esta tabla no existe"})
  }else{
  let updating = await Userdata.update(
   { where: { usuarioId: id }
  }
  ,{
    usuarioId: id,
    nombre,
    apellido,
    documento,
    ciudad,
    pais,
    telefono,
    direccion,
    departamento
  })
  res.status(200).json({"Ok":"Actualizado correctamente", "data, para testeo borrar pliz":updating})
}  
})
module.exports = router;
