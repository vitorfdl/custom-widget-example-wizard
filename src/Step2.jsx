import { h } from 'preact';

export default function Step2(props) {

  const { variables, onChangeVariable } = props;

  return (
    <div className="step-container">
      <h3>Step 2</h3>
      <br/>
      <div class="form-group">
        <label for="var3">var3</label>
        <input
          id="var3"
          value={(variables && variables.var3) ? variables.var3 : ""}
          onChange={(e) => onChangeVariable('var3', e.target.value)} 
        />
      </div>
      <div class="form-group">
        <label for="var4">var4</label>
        <input
          id="var4"
          value={(variables && variables.var4) ? variables.var4 : ""}
          onChange={(e) => onChangeVariable('var4', e.target.value)} 
        />
      </div>
    </div>
  );
}
