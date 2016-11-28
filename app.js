/*
    React component Comida
 */
var Comida = React.createClass({
    getInitialState: function(){
        return{
            like: Boolean(this.props.like),
            editing: false
        };
    },
    handleLike: function(){
        this.setState({
            like: !this.state.like
        });
    },
    edit: function(){
        this.setState({editing: true});
    },
    save: function(){
        this.props.onChange(this.refs.nuevoNombre.value, this.props.index);
        this.setState({editing: false});
    },
    remove: function(){
        this.props.onRemove(this.props.index);
    },
    cancel: function(){
        this.setState({editing: false});
    },
    showEditingView: function(){
        return (
            <div className="comida">
                <input ref="nuevoNombre" type="text" className="form-control" 
                       placeholder="Agregar nueva nombre..." 
                       defaultValue={this.props.nombre} />
                <div>
                    <a className="glyphicon glyphicon-ok-circle blue" onClick={this.save}></a>
                    <a className="glyphicon glyphicon-remove-circle red" onClick={this.cancel}></a>
                </div>
            </div>
        );
    },
    showFinalView: function(){
        return (
            <div>
                <h1 className="bg-success">{this.props.nombre}</h1>
                <p className="bg-info">
                    Comida <i>{this.props.children}</i>
                </p>
                <div>
                    <input 
                    onChange={this.handleLike}
                    defaultChecked={this.state.like}
                    type="checkbox" className="glyphicon glyphicon-heart glyphicon-heart-lg" />
                    <br />
                    Like: <b>{String(this.state.like)}</b>
                </div>
                <div>
                    <a className="glyphicon glyphicon-pencil blue" onClick={this.edit}></a>
                    <a className="glyphicon glyphicon-trash red" onClick={this.remove}></a>
                </div>
            </div>
        );
    },
    render: function() {
        if(this.state.editing){
            return this.showEditingView();
        }else{
            return this.showFinalView(); 
        }
    }
});

/*
    React component ListaComida
*/
var ListaComida = React.createClass({
    getInitialState: function(){
        return{
            comidas: ['Gallopinto', 'Paella', 'Ceviche']
        };
    },
    getDefaultProps: function(){
        return {
            framework: "React",
            tech: "JS"
        }
    },
    componentWillMount: function(){
        var self = this;
        var pais;

        /*
         * Just for testing loading external files
        $.getJSON('https://restcountries.eu/rest/v1/all', function(data) {
            for(pais in data){
                console.log(pais, data[pais].name);
                self.add(data[pais].name);
            }
            $(self.refs.spinner).removeClass("glyphicon-refresh-animate"); 
            $(self.refs.spinner).hide();
        });
        */
    },
    componentDidMount: function(){
       //$(this.refs.spinner).addClass("glyphicon-refresh-animate");
    },
    add: function(comida){
        var nuevaComida = this.refs.nuevaComida.value;
        console.log(nuevaComida);

        if(nuevaComida == ""){
            if(typeof comida == 'undefined'){
                nuevaComida = "Nueva Comida";
            }else{
                nuevaComida = comida;
            }
        }

        var arr = this.state.comidas;
        arr.push(nuevaComida);
        this.setState({comidas: arr});
        this.refs.nuevaComida.value = "";
    },
    update: function(nuevoNombre, i){
        var arr = this.state.comidas;
        arr[i] = nuevoNombre;
        this.setState({comidas: arr});
    },
    remove: function(i){
        var arr = this.state.comidas;
        arr.splice(i, 1);
        this.setState({comidas: arr});
    },
    eachItem: function(comida, i){
        return(
            <Comida key={i} 
                    index={i} 
                    nombre={comida} 
                    onRemove={this.remove}
                    onChange={this.update}>
                {i+1}
            </Comida>
        );
    },
    handleKeyDown: function(e){
        if(e.charCode === 13){
            this.add();
        }
    },
    render: function(){
        return (
            <div className="centerBlock">
                <header>
                    <h1>Mis comidas favoritas</h1>
                    <i>Total: {this.state.comidas.length}</i>
                    <br />
                    <span ref="spinner" className="glyphicon glyphicon-refresh"></span>
                    <br />
                    <i>Hecho con {this.props.framework}, una libreria de {this.props.tech}</i>
                </header>
                <div className="input-group"> 
                    <input ref="nuevaComida" onKeyPress={this.handleKeyDown} type="text" 
                           className="form-control" placeholder="Agregar nueva comida..." />
                    <span className="input-group-btn">
                        <div className="btn btn-default btn-success" 
                            onClick={this.add.bind(null, "Nueva Comida")}> + </div>
                    </span>
                </div> 
                <div className="comidas">
                    {
                        this.state.comidas.map(this.eachItem)
                    }
                </div>
            </div>
        );
    }
});

ReactDOM.render(<ListaComida/>, document.getElementById('container'));
