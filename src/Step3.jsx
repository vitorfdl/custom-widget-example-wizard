import { h } from 'preact';

export default function Step2(props) {

  const { variables, onChangeVariable } = props;

  return (
    <div className="step-container">
      <h3>Step 3</h3>
      <br/>
      <div class="form-group">
        <label for="var5">var5</label>
        <input
          id="var5"
          value={(variables && variables.var5) ? variables.var5 : ""}
          onChange={(e) => onChangeVariable('var5', e.target.value)} 
        />
      </div>
      <div class="form-group">
        <label for="var6">var6</label>
        <input
          id="var6"
          value={(variables && variables.var6) ? variables.var6 : ""}
          onChange={(e) => onChangeVariable('var6', e.target.value)} 
        />
      </div>
    </div>
  );
}
