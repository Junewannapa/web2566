const RB=ReactBootstrap;
const firebaseConfig = {
  apiKey: "AIzaSyA-IpE9DHyQuZ1XmqrEvg8R7rSqjliFQbg",
  authDomain: "web2566-ca75c.firebaseapp.com",
  projectId: "web2566-ca75c",
  storageBucket: "web2566-ca75c.appspot.com",
  messagingSenderId: "44347073660",
  appId: "1:44347073660:web:3ba2ce241b9b5e8c5f95f9",
  measurementId: "G-C9ZL0K6BZN"
};
firebase.initializeApp(firebaseConfig);   
const db = firebase.firestore();


class App extends React.Component {
    title = (
      <RB.Alert variant="info">
        <b>Work6 :</b> Firebase
      </RB.Alert>
    );
    footer = (
      <div>
        By 653380011-7 วรรณภา บุษบง <br />
        College of Computing, Khon Kaen University
      </div>
    );
    state = {
        scene: 0,
        students:[],
        stdid:"",
        stdfname:"",
        stdlname:"",
        stdemail:"",
        stdtitle:""
    }      
    render() {
      return (
        <RB.Card>
          <RB.Card.Header>{this.title}</RB.Card.Header>  
          <RB.Card.Body>
          <RB.Button onClick={()=>this.readData()}>Read Data</RB.Button>  
          <RB.Button onClick={()=>this.autoRead()} variant="warning">Auto Read</RB.Button>
          
            <table  class="table">
            <tr>
                <th scope="col">รหัสนักศึกษา</th>
                <th scope="col">คำนำหน้า</th>
                <th scope="col">ชื่อ</th>
                <th scope="col">นามสกุล</th>
                <th scope="col">อีเมล</th>
            </tr>
            {this.state.students.map((std,index)=>(
                <tr >
                    <td>{std.id}</td>
                    <td>{std.title}</td>
                    <td>{std.fname}</td>
                    <td>{std.lname}</td>
                    <td>{std.email}</td>
                    <td><EditButton std={std} app={this} /></td>
                    <td><DeleteButton std={std} app={this} /></td>
                </tr>

            ))}
            </table>
          </RB.Card.Body>
          <RB.Card.Footer>
          <b>เพิ่มนักศึกษา :</b><br/>
        <TextInput label="ID" app={this} value="stdid"/>  
        <TextInput label="ชื่อ" app={this} value="stdfname"/>
        <TextInput label="สกุล" app={this} value="stdlname"/>
        <TextInput label="Email" app={this} value="stdemail"/>
        <TextInput label="title" app={this} value="stdtitle"/>             
        <RB.Button onClick={()=>this.insertData()}>เพิ่มข้อมูล</RB.Button>

          </RB.Card.Footer>
          <RB.Card.Footer>{this.footer}</RB.Card.Footer>
        </RB.Card>          
      );
    }   
    readData(){
        db.collection("students").get().then((querySnapshot) => {
            var stdlist=[];
            querySnapshot.forEach((doc) => {
                stdlist.push({id:doc.id,... doc.data()});                
            });
            console.log(stdlist);
            this.setState({students: stdlist});
        });
    }
    autoRead(){
        db.collection("students").onSnapshot((querySnapshot) => {
            var stdlist=[];
            querySnapshot.forEach((doc) => {
                stdlist.push({id:doc.id,... doc.data()});                
            });          
            this.setState({students: stdlist});
        });
    }
    insertData(){
        db.collection("students").doc(this.state.stdid).set({
           title : this.state.stdtitle,
           fname : this.state.stdfname,
           lname : this.state.stdlname,
           email : this.state.stdemail,
        });
      }
      edit(std){      
        this.setState({
         stdid:std.id,
         stdtitle:std.title,
         stdfname:std.fname,
         stdlname: std.lname,
         stdemail : std.email,
        })
     }
     
delete(std){
    if(confirm("ต้องการลบข้อมูล")){
       db.collection("students").doc(std.id).delete();
    }
}  
  }

  function TextInput({label,app,value}){
    return <label className="form-label">
    {label}:    
     <input className="form-control"
     value={app.state[value]} onChange={(ev)=>{
         var s={};
         s[value]=ev.target.value;
         app.setState(s)}
     }></input>
   </label>;  
  }
  function EditButton({std,app}){
    return <button onClick={()=>app.edit(std)} >แก้ไข</button>
   }
   function DeleteButton({std,app}){    
    return <button onClick={()=>app.delete(std)}>ลบ</button>
  }

 


  const container = document.getElementById("myapp");
  const root = ReactDOM.createRoot(container);

  root.render(<App />);
