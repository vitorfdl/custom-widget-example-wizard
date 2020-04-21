import { h, render } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import "@tago/custom-widget";
import "@tago/custom-widget/dist/custom-widget.css"
import "./Widget.css";
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

function Widget() {
  const [activeStep, setActiveStep] = useState(0);
  const [variables, setVariables] = useState({});
  const [response, setResponse] = useState("");

  const steps = [
    Step1,
    Step2,
    Step3
  ];

  const nextStep = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  }

  const previousStep = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  }

  const onChangeVariable = (variableName, value) => {
    setVariables({...variables, [variableName]: value})
  }

  useEffect(() => {
    window.TagoIO.onStart();

    window.TagoIO.onRealtime((data) => {
      // get the last variable from realtime
      let realtime = {};
      // var2 is a dropdown variable, the selected data is saved in var2val
      realtime["var2"] = [];
      if (data && data.result.length) {
        data.result.forEach(el => {
          if (el.variable == "var2") {
            realtime[el.variable].push(el.value);
          } else if (realtime[el.variable] == undefined
            || realtime[el.variable] == "") {
            realtime[el.variable] = el.value;   
          }
        })
      }
      setVariables(realtime);
    })
  }, []);

  const sendData = () => {
    const arr = [];
    Object.keys(variables).forEach(function(key) {
      // var2 is a dropdown variable, the selected data is saved in var2val
      if (key !== "var2") {
        arr.push({ variable: key, value: variables[key] });
      }
    });
    window.TagoIO.sendData(
      arr, { autoFill: true }, 
      (response) => {
        if (response.status) {
          setResponse("data sent successfully");
        } else {
          setResponse(response.message);
        }
    })
  }
  const ActualStep = steps[activeStep];

  return (
    <div className="container">
      <h1>Wizard example:</h1>

      {response ? (
        <div className="response">
          <div>{response}</div>
          <button onClick={() => {
            setActiveStep(0);
            setResponse("");
            }}>New form</button>
        </div>
      ) : (
        <div>
          <ActualStep variables={variables} onChangeVariable={onChangeVariable}/>

          <div className="buttons">
            {(activeStep > 0) && (
              <button onClick={previousStep}>Previous</button>
            )}
            {activeStep < steps.length - 1 ? (
              <button onClick={nextStep}>Next</button>
            ) : (
              <button onClick={sendData}>Submit</button>
            )}
          </div>
          <div style="text-align:center;margin-top: 15px;">
            {steps.map((el, index) =>  (
              <span className={`step ${index == activeStep ? 'active' : ''}`}></span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

render(<Widget />, document.body);
