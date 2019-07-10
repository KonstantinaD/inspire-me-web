import React, {Component} from 'react';
import {Container} from 'reactstrap';
import '../App.css';
import Header from './Header';
import Footer from './Footer';

class AboutUs extends Component {

  render() {

    return (
     <div>
       <Header/>
       <Container fluid>
       <h4><b>Who We Are</b></h4>
       <br/>
       <p>Sit amet volutpat consequat mauris. Pretium nibh ipsum consequat nisl vel pretium lectus quam. Sollicitudin
       nibh sit amet commodo nulla facilisi nullam vehicula ipsum. Quis eleifend quam adipiscing vitae proin sagittis
       nisl. Rhoncus urna neque viverra justo.
       </p>
       <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
       magna aliqua. Malesuada pellentesque elit eget gravida cum sociis natoque penatibus et. Praesent semper feugiat
       nibh sed pulvinar proin gravida hendrerit. Quis eleifend quam adipiscing vitae proin sagittis nisl. Egestas
       integer eget aliquet nibh. Accumsan tortor posuere ac ut consequat semper viverra nam. Dignissim diam quis enim
       lobortis.Tellus pellentesque eu tincidunt tortor aliquam nulla facilisi cras. Enim ut tellus elementum sagittis
       vitae. Interdum posuere lorem ipsum dolor sit amet consectetur. Vel eros donec ac odio tempor orci dapibus
       ultrices in. Dapibus ultrices in iaculis nunc sed augue. Arcu odio ut sem nulla pharetra diam sit. Ac tortor
       dignissim convallis aenean et tortor at. Egestas sed tempus urna et pharetra pharetra massa. Lectus magna
       fringilla urna porttitor. Vel quam elementum pulvinar etiam non. Blandit volutpat maecenas volutpat blandit.
       </p>
       <p>Lectus magna fringilla urna porttitor. Vel quam elementum pulvinar etiam non. Blandit volutpat maecenas
       volutpat blandit. Fermentum et sollicitudin ac orci phasellus egestas tellus rutrum tellus. Mi eget mauris
       pharetra et ultrices neque ornare aenean. Ut sem nulla pharetra diam. Libero nunc consequat interdum varius
       sit amet mattis.Nunc mi ipsum faucibus vitae aliquet nec. Eleifend mi in nulla posuere sollicitudin. In tellus
       integer feugiat scelerisque varius morbi enim nunc faucibus. Ac felis donec et odio pellentesque diam volutpat
       commodo. At quis risus sed vulputate odio ut enim. Enim ut tellus elementum sagittis vitae et leo. Dictum varius
       duis at consectetur lorem.
       </p>
       <p>Nisl nisi scelerisque eu ultrices. Ornare massa eget egestas purus viverra accumsan in nisl nisi. Fusce ut
       placerat orci nulla pellentesque. Dolor purus non enim praesent elementum facilisis leo.Volutpat commodo sed
       egestas egestas fringilla phasellus. Commodo odio aenean sed adipiscing diam donec. Cursus turpis massa
       tincidunt dui ut. Cras adipiscing enim eu turpis egestas pretium aenean pharetra magna. Pellentesque adipiscing
       commodo elit at. Sit amet volutpat consequat mauris. Pretium nibh ipsum consequat nisl vel pretium lectus quam.
       Sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula ipsum. Quis eleifend quam adipiscing vitae
       proin sagittis nisl. Rhoncus urna neque viverra justo.Amet dictum sit amet justo.
       </p>
       <p>Nulla facilisi etiam dignissim diam quis enim lobortis scelerisque fermentum!</p>
       </Container>
       <div className="footerPadding"></div>
       <Footer/>
     </div>
     );
  }
}

export default AboutUs;