const RB=ReactBootstrap;

        // TODO: Add SDKs for Firebase products that you want to use
        // https://firebase.google.com/docs/web/setup#available-libraries
      
        // Your web app's Firebase configuration
        const firebaseConfig = {
          apiKey: "AIzaSyA-IpE9DHyQuZ1XmqrEvg8R7rSqjliFQbg",
          authDomain: "web2566-ca75c.firebaseapp.com",
          projectId: "web2566-ca75c",
          storageBucket: "web2566-ca75c.appspot.com",
          messagingSenderId: "44347073660",
          appId: "1:44347073660:web:3ba2ce241b9b5e8c5f95f9",
          measurementId: "G-C9ZL0K6BZN"
        };
      
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);      
        const db = firebase.firestore();

        // db.collection("students").get().then((querySnapshot) => {
        //     querySnapshot.forEach((doc) => {
        //         console.log(`${doc.id} =>`, doc.data());
        //     });
        // });
class App extends React.Component {
    title = (
      <RB.Alert variant="info">
        <b>Work6 :</b> Firebase
      </RB.Alert>
    );
    footer = (
      <div>
        By  653380011-7, วรรณภา บุษบง <br/>
        College of Computing, Khon Kaen University
      </div>
    );
    state = {
        scene: 0,
        students:[],
        stdid: "",
        stdtitle: "",
        stdfname: "",
        stdlname: "",
        stdemail: "",
        isupdate: false,
        user: null
    }      
    render() {
      firebase.auth().onAuthStateChanged((user)=>{
        if (user) {
          this.state.user = user.toJSON();
        }else{
          this.state.user = null;
       }
     });
      return (
        <RB.Card>
          <RB.Card.Header>{this.title}</RB.Card.Header>  
          <RB.Card.Body>
            {/* <RB.Button variant="primary" onClick={() => this.google_login()}>Login</RB.Button>
            {this.user ? (
              <>
              <div>
                <img src={this.user.photoURL} width="50" />
                <span>{this.user.displayName}</span>
              </div>
              <RB.Button variant="danger" onClick={() => this.google_logout()}>Logout</RB.Button>
              </>
            ) : null} */}
            <RB.Button variant="primary" onClick={() => this.readData()}>Read Data</RB.Button>
            <RB.Button variant="success" onClick={() => this.autoRead()}>Auto Read Data</RB.Button>
            {/* <this.showData data={this.state.students} /> */}
            <RB.Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Name</th>
                    <th>Lastname</th>
                    <th>Email</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {this.state.students.map((std, index) => (
                    <tr>
                        <td>{index + 1}</td>
                        <td>{std.id}</td>
                        <td>{std.title}</td>
                        <td>{std.fname}</td>
                        <td>{std.lname}</td>
                        <td>{std.email}</td>
                        <td>
                        <RB.Button variant="warning" onClick={(e) => this.setState({stdid: std.id, stdtitle: std.title, stdfname: std.fname, stdlname: std.lname, stdemail: std.email, isupdate:true})}>Edit</RB.Button>
                        <RB.Button variant="danger" onClick={(e) => this.deleteData(e, std.id)}>Delete</RB.Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </RB.Table>
          </RB.Card.Body>
          <RB.Card>
            <RB.Card.Header>Insert/Update Data</RB.Card.Header>
            <RB.Card.Body>
              <RB.Form>
              <RB.Form.Group controlId="formBasicText">
                  <RB.Form.Label>ID</RB.Form.Label>
                  <RB.Form.Control type="text" placeholder="Enter Student ID" value={this.state.stdid} onChange={(e) => this.setState({ stdid: e.target.value })} readOnly={this.state.isupdate == true}  />
                  <span>id: {this.state.stdid}</span>
                </RB.Form.Group>
                <RB.Form.Group controlId="formBasicText">
                  <RB.Form.Label>Title</RB.Form.Label>
                  <RB.Form.Control type="text" placeholder="Enter First Name" value={this.state.stdtitle} onChange={(e) => this.setState({ stdtitle: e.target.value })} />
                </RB.Form.Group>
                <RB.Form.Group controlId="formBasicText">
                  <RB.Form.Label>First Name</RB.Form.Label>
                  <RB.Form.Control type="text" placeholder="Enter First Name" value={this.state.stdfname} onChange={(e) => this.setState({ stdfname: e.target.value })} />
                </RB.Form.Group>
                <RB.Form.Group controlId="formBasicText">
                  <RB.Form.Label>Last Name</RB.Form.Label>
                  <RB.Form.Control type="text" placeholder="Enter Last Name" value={this.state.stdlname} onChange={(e) => this.setState({ stdlname: e.target.value })} />
                </RB.Form.Group>
                <RB.Form.Group controlId="formBasicEmail">
                  <RB.Form.Label>Email</RB.Form.Label>
                  <RB.Form.Control type="email" placeholder="Enter Email" value={this.state.stdemail} onChange={(e) => this.setState({ stdemail: e.target.value })} />
                </RB.Form.Group>  <br/>
                <RB.Button variant="primary" type="submit" onClick={(e)=>this.handlesubmit(e)}>
                  Submit/Update
                </RB.Button>
              </RB.Form>
            </RB.Card.Body>
          </RB.Card>
          <RB.Card.Footer>{this.footer}</RB.Card.Footer>
        </RB.Card>          
      );
    }      
    
    readData() {
        db.collection("students").get().then((querySnapshot) => {
            var stdlist = [];
            querySnapshot.forEach((doc) => {
                stdlist.push({id:doc.id, ...doc.data()});
            });
            this.setState({students:stdlist});
        });
    }

    autoRead(){
        db.collection("students").onSnapshot((querySnapshot) => {
            var stdlist = [];
            querySnapshot.forEach((doc) => {
                stdlist.push({id:doc.id, ...doc.data()});
            });
            this.setState({students:stdlist});
        });
    }

    // showData({data}){
    //     return (
    //         <RB.Table striped bordered hover>
    //         <thead>
    //             <tr>
    //                 <th>#</th>
    //                 <th>ID</th>
    //                 <th>Name</th>
    //                 <th>Lastname</th>
    //                 <th>Email</th>
    //                 <th>Action</th>
    //             </tr>
    //         </thead>
    //         <tbody>
    //             {data.map((std, index) => (
    //                 <tr>
    //                     <td>{index + 1}</td>
    //                     <td>{std.id}</td>
    //                     <td>{std.fname}</td>
    //                     <td>{std.lname}</td>
    //                     <td>{std.email}</td>
    //                     <td>
    //                     <RB.Button variant="danger" onClick={(e) => this.deleteData(e, std.id)}>Delete</RB.Button>
    //                     </td>
    //                 </tr>
    //             ))}
    //         </tbody>
    //     </RB.Table>
    //     );
    // }

    handlesubmit(e){
        e.preventDefault();
        db.collection("students").doc(this.state.stdid).set({
            title: this.state.stdtitle,
            fname: this.state.stdfname,
            lname: this.state.stdlname,
            email: this.state.stdemail
        }).then(() => {
            console.log("Document successfully written!");
            this.setState({stdid: "", stdtitle: "", stdfname: "", stdlname: "", stdemail: "", isupdate: false});
        }).catch((error) => {
            console.error("Error writing document: ", error);
        });
        
    }

    deleteData(e, id){
        e.preventDefault();
        if(confirm("Are you sure to delete?")){
        db.collection("students").doc(id).delete().then(() => {
            console.log("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }else{
        console.log("Cancel");
        }
    }
  //   mounted() {
  //     firebase.auth().onAuthStateChanged((user)=>{
  //        if (user) {
  //          this.user = user.toJSON();
  //        }else{
  //          this.user = null;
  //       }
  //     });
  // }

  google_login() {
    // Using a popup.
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope("profile");
    provider.addScope("email");
    firebase.auth().signInWithPopup(provider)
  }
  google_logout(){
    if(confirm("Are you sure?")){
      firebase.auth().signOut();
    }
  }
}


  const container = document.getElementById("myapp");
  const root = ReactDOM.createRoot(container);
  root.render(<App />);
