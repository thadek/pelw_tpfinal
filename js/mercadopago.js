
const mp = new MercadoPago('TEST-a6de6953-9940-422c-a5a8-de623002d581');
const bricksBuilder = mp.bricks();

const ids = {
    1:"228635466-d3c0409b-7b5c-4e2f-9419-51dcbc833b3d",
    2:"228635466-2ef0024f-bd90-499c-b0c0-043faaaf5bb5",
    3:"228635466-1375bd2b-dc2b-4c51-81d7-e99d17ff4da1"
}

const renderizarBtn = (id) => {
    mp.bricks().create("wallet", `btn-pago${id}`, {
        initialization: {
            preferenceId: ids[id],
        },
     });
}
renderizarBtn(1);
renderizarBtn(2);
renderizarBtn(3);

