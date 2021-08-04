import gif from "../drgif.gif"
function About() {
    return (
        <div className="about-wrapper">
            <h1>Bem vindo!</h1>
            <p>Esse mural de memes foi feito para a Code's Moon com a intenção de zoar, se você tiver sugerencias ou quiser colocar mais memes entre em nosso github</p>
            <img src={gif} alt="dr sexo"></img>
            <br/><br/><br/>
            <sup>by rortan Feat. Datrat e U BRASSO<br /> Feito em React.</sup>
            <br />
        </div>
    );
}

export default About;
