## Code's Moon Memes
### Como adicionar mais memes

<p>1. Crie uma pull request adicione o .mp4 do video desejado na pasta Videos (Src > Videos)</p>
<p>2. Vá a pasta Components e Videoswrap.js</p>
<p>3. Importe o Video utilizando a mesma escritura de todos os outros imports</p>
<code>
import video from "../videos/videourl.mp4";
</code>
<p>4. Baixe até a ultima lista de videos e crie uma section como as outras com um titulo e utilizando a tag customizada de <Video /> </p>
## Exemplo:
<code>
<section className="main-videos-row row1">
                <h2> Titulo </h2>
                <div className="videos-row">
                    <Videos url={video57} />
                    <Videos url={video58} />
                    <Videos url={video59} />
                    <Videos url={video60} />
                </div>
            </section>
</code>
<p>5. Inclua o nome do import no atributo de url="" </p>
