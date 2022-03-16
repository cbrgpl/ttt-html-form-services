module.exports.form = `
<form id="form" action="">
        <input data-field-name="email" data-field-type="text" type="text">
        <div data-field-name="country" data-field-type="multipleSelect" >
            <input id="rus" value="russia" type="checkbox" >
            <label for="rus">russia</label>

            <input id="can" value="canada" type="checkbox" >
            <label for="can">canada</label>

            <input id="usa" value="usa" type="checkbox" >
            <label for="usa">usa</label>
        </div>
        <input data-field-name="rememberMe" data-field-type="singleSelect" type="checkbox" >

        <button > test </button>
</form>
`;
