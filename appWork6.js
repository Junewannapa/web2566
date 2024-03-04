import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as ReactBootstrap from 'react-bootstrap';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

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
  state = {
    scene: 0,
    students: [],
    stdid: "",
    stdtitle: "",
    stdfname: "",
    stdlname: "",
    stdemail: "",
    isupdate: false,
    user: null
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user: user.toJSON() });
      } else {
        this.setState({ user: null });
      }
    });
  }

  render() {
    return (
      <ReactBootstrap.Card>
        <ReactBootstrap.Card.Header>{this.title}</ReactBootstrap.Card.Header>
        <ReactBootstrap.Card.Body>
          <ReactBootstrap.Button onClick={() => this.readData()}>Read Data</ReactBootstrap.Button>
          <ReactBootstrap.Button onClick={() => this.autoRead()}>Auto Read</ReactBootstrap.Button>
          <div>
            <StudentTable data={this.state.students} app={this} />
          </div>
        </ReactBootstrap.Card.Body>
        <ReactBootstrap.Card.Footer>
          <b>เพิ่ม/แก้ไขข้อมูล นักศึกษา :</b><br />
          <TextInput label="ID" app={this} value="stdid" style={{ width: 120 }} />
          <TextInput label="คำนำหน้า" app={this} value="stdtitle" style={{ width: 100 }} />
          <TextInput label="ชื่อ" app={this} value="stdfname" style={{ width: 120 }} />
          <TextInput label="สกุล" app={this} value="stdlname" style={{ width: 120 }} />
          <TextInput label="Email" app={this} value="stdemail" style={{ width: 150 }} />
          <TextInput label="Phone" app={this} value="stdphone" style={{ width: 120 }} />
          <ReactBootstrap.Button onClick={() => this.insertData()}>Save</ReactBootstrap.Button>
        </ReactBootstrap.Card.Footer>
        <ReactBootstrap.Card.Footer>{this.footer}</ReactBootstrap.Card.Footer>
      </ReactBootstrap.Card>
    );
  }

  readData() {
    db.collection("students").get().then((querySnapshot) => {
      var stdlist = [];
      querySnapshot.forEach((doc) => {
        stdlist.push({ id: doc.id, ...doc.data() });
      });
      this.setState({ students: stdlist });
    });
  }

  autoRead() {
    db.collection("students").onSnapshot((querySnapshot) => {
      var stdlist = [];
      querySnapshot.forEach((doc) => {
        stdlist.push({ id: doc.id, ...doc.data() });
      });
      this.setState({ students: stdlist });
    });
  }

  handlesubmit(e) {
    e.preventDefault();
    db.collection("students").doc(this.state.stdid).set({
      title: this.state.stdtitle,
      fname: this.state.stdfname,
      lname: this.state.stdlname,
      email: this.state.stdemail
    }).then(() => {
      console.log("Document successfully written!");
      this.setState({ stdid: "", stdtitle: "", stdfname: "", stdlname: "", stdemail: "", isupdate: false });
    }).catch((error) => {
      console.error("Error writing document: ", error);
    });
  }

  deleteData(e, id) {
    e.preventDefault();
    if (window.confirm("Are you sure to delete?")) {
      db.collection("students").doc(id).delete().then(() => {
        console.log("Document successfully deleted!");
      }).catch((error) => {
        console.error("Error removing document: ", error);
      });
    } else {
      console.log("Cancel");
    }
  }

  google_login() {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope("profile");
    provider.addScope("email");
    firebase.auth().signInWithPopup(provider);
  }

  google_logout() {
    if (window.confirm("Are you sure?")) {
      firebase.auth().signOut();
    }
  }
}

const container = document.getElementById("myapp");
ReactDOM.render(<App />, container);
