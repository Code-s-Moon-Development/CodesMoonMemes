import gif from "./drgif.gif";

function About() {
    return (
        <div className="about-wrapper">
            <h1>Bem vindo!</h1>
            <p>
                Este site é uma biblioteca de memes de livre acesso. Suba qualquer meme anonimamente ou veja outros memes engraçados publicados por
                outros usuarios.
                <br />
                <br />
                Feito para a comunidade Code's Moon (link para o discord acima) com a intenção de zoar, se você tiver sugerencias ou quiser reportar
                algum video entre em nosso github.
            </p>
            <img src={gif} alt="dr sexo" />
            <br />
            <br />
            <br />
            <sup>Feito por Rortan, Feat. Datrat e U BRASSO</sup>
            <br />
        </div>
    );
}

export default About;
