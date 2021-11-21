
import { useState } from 'react';
import './App.css';

function App() {
  var finalScript = "";
  var output;
  const [file,updateFile] = useState();
  const [empty,updateEmpty] = useState(true);
  const[fileSelected,updateFileSelected] = useState(false);
  const [final,updateFinal] = useState()

  const reader = new FileReader();

  const GetFile = (e) =>{
    updateFile(e.target.files[0])
    updateFileSelected(true)

  }
  const GetSubmit = () =>{
    if(fileSelected){
      reader.readAsText(file);
      Reformat();
    }
    
  }
  const Reformat = () =>{
    reader.onload = function(){
      output = reader.result;
      for(var i=0; i<=output.length;i++){
        if(output.charAt(i) === "{"){
          for(var x=i+1;i<=output.length;x++){
            if(output.charAt(x) === "}"){
              finalScript += (output.substring(i+1,x).replace("\\\\rtf1","").replace("\\'","'").replace("\\\\par",""));
              break;
            }
          }
        }
      }
      updateFinal(finalScript);
      updateEmpty(false);
    }    
  }



  return (
    <div className="App">
      <h1 className="title">Caption Gen</h1>
      <a target="_blank" href="https://documentcloud.adobe.com/link/review?uri=urn:aaid:scds:US:1baaf230-6b9a-4c38-9c21-8803201b193e">Instructions</a>
      <div className="input">
        <input className="fileInput" type="file" onChange={GetFile}></input>
        <button className="Translate" onClick={GetSubmit}>Translate</button>

      </div>


      {!empty && <div id="final" class="outPutBox">{final}</div>}
    </div>
  );
}

export default App;
