const RB = ReactBootstrap;
const { Alert, Card, Button, Table } = ReactBootstrap;


class App extends React.Component {
    title = ( <Alert variant = "info" >
        <b> Work6: </b> Firebase </Alert >);
    footer = ( <div>By 653380011-7 นางสาววรรณภา บุษบง สาขาIT <br/>
    College of Computing, Khon Kaen University </div>);
    state = {
        scene: 0,
    }
    render() {
        return ( <Card >
            <Card.Header > { this.title } </Card.Header>   
            <Card.Body> </Card.Body> 
            <Card.Footer> { this.footer } </Card.Footer> 
            </Card>
        );
    }
}


const container = document.getElementById("myapp");
const root = ReactDOM.createRoot(container);
root.render(<App/>);
