<template>
  <div class="login">
    <h1 class="title">Login in the page</h1>
    <form action class="form" @submit.prevent="login">
      <label class="form-label" for="#email">Email:</label>
      <input
        v-model="email"
        class="form-input"
        type="email"
        id="email"
        required
        placeholder="Email"
      />
      <label class="form-label" for="#password">Password:</label>
      <input
        v-model="password"
        class="form-input"
        type="password"
        id="password"
        placeholder="Password"
      />     
      <label class="form-label" for="#companyType">Tipo de empresa:</label>
      <select v-model="companyType" class="form-select" id="companyType" required>
        <option disabled value="">Selecciona...</option>
        <option value=1 class="form-option">Propiedad Horizontal</option>
        <option value=2 class="form-option">Persona Natural</option>
        <option value=3 class="form-option">Persona Jurídica</option>
      </select>
      <div v-if="companyType == '1'" class="extra-fields">
  <label class="form-label" for="#towerNumber">Numero Torre/Interior:</label>
  <input 
  v-model="towerNumber" 
  class="form-input" 
  type="text"
  id="towerNumber" 
  placeholder="Número de Torre" 
  />        
  <label class="form-label" for="#apartmentNumber">Número Apartamento/Casa:</label>
  <input 
    v-model="apartmentNumber" 
    class="form-input" 
    type="text"
    id="apartmentNumber" 
    placeholder="Número de Apartamento" >
</div>
      <p v-if="error" class="error">
        Has introducido mal el email o la contraseña.
      </p>
      <input class="form-submit" type="submit" value="Login" />
    </form>
    <p class="msg">
      ¿No tienes cuenta?
      <router-link to="/Register">Regístrate</router-link>
    </p>
  </div>
</template>

<script>
import auth from "@/logic/auth";
export default {
  data: () => ({
    email: "",
    password: "",
    error: false,
    companyType: null,
    towerNumber:"",
    apartmentNumber:""

  }),
  methods: {
    async login() {
  try {
    const response =await auth.login(this.email, this.password,this.companyType,this.towerNumber,this.apartmentNumber);
    const user = {
      email: this.email,     
        idEmpresa: response.data.idEmpresa,
        idUsuario: response.data.idUsuario,
        token: response.data.token
    };
    const userJSON = JSON.stringify(user);   
    auth.setUserLogged(userJSON); 
    const userLogged = auth.getUserLogged();
    const userLoggedObject = JSON.parse(userLogged);
    console.log(userLoggedObject.idEmpresa);

    this.$router.push("/dashboard");
  } catch (error) {
    console.log(error);
    this.error = true;
  }
},
  },
};
</script>
<style lang="scss" scoped>
.login {
  padding: 2rem;
}
.title {
  text-align: center;
}
.form {
  margin: 3rem auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 20%;
  min-width: 350px;
  max-width: 100%;
  background: rgba(19, 35, 47, 0.9);
  border-radius: 5px;
  padding: 40px;
  box-shadow: 0 4px 10px 4px rgba(0, 0, 0, 0.3);
}
.form-label {
  margin-top: 2rem;
  color: white;
  margin-bottom: 0.5rem;
  &:first-of-type {
    margin-top: 0rem;
  }
}

.form-submit {
  background: #1ab188;
  border: none;
  color: white;
  margin-top: 3rem;
  padding: 1rem 0;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #0b9185;
  }
}
.form-input, .form-select {
  padding: 10px 15px;
  background: rgba(255, 255, 255, 0.3); /* Aquí está el color de fondo claro */
  background-image: none;
  border: 1px solid white;
  color: white;
  width: 100%; /* Aquí establecemos un ancho fijo del 100% para que todos los campos de entrada tengan el mismo tamaño */
  box-sizing: border-box; /* Esto es para que el ancho del campo de entrada incluya el padding y el border */
  &:focus {
    outline: 0;
    border-color: #1ab188;
  }
}

.form-option {
  background: rgba(255, 255, 255, 0.3); /* Aquí está el color de fondo claro */
  color: rgb(0, 3, 2);
}
.error {
  margin: 1rem 0 0;
  color: #ff4a96;
}
.msg {
  margin-top: 3rem;
  text-align: center;
}
.extra-fields {
  margin-top: 2rem;
  margin-bottom: 2rem;
}

</style>