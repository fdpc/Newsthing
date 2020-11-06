import React from 'react';
/**
 * App
 *
 * Simple react js fetch example
 */

function News(type)
{
  this.sub = type
  this.status = "error"
  this.getStat = (query) =>
  {
    if(query=="" || query == undefined)
    {
    return fetch("https://newsapi.org/v2/top-headlines?country=us&category="+this.sub+"&apiKey=78b9d599c4f94f8fa3afb1a5458928d6")
    .then((res) => res.json()).then((info) => 
    {this.status = info.status
    this.stuff = info.articles
    });
    }
    return fetch("https://newsapi.org/v2/top-headlines?q="+query+"&category="+this.sub+"&apiKey=78b9d599c4f94f8fa3afb1a5458928d6")
    .then((res) => res.json()).then((info) => 
    {this.status = info.status
    this.stuff = info.articles
    });
  }
  
  
}

class App extends React.Component{


    /**
     * constructor
     *
     * @object  @props  parent props
     * @object  @state  component state
     */
    constructor(props) {
        super(props);
        this.state = {
            items1: [],
            items2: [],
            items3: [],
            isLoaded: false,
            tech: true,
            entr: false,
            sprt: false,
            term: "",
        }
    }

    /**
     * componentDidMount
     *
     * Fetch json array of objects from given url and update state.
     */
    componentDidMount() {
        let tech = new News("technology")
        let spor = new News("sports")
        let entr = new News("entertainment")
        //let all = [tech.getStat(), news.getStat(), sports.getStat()]
        tech.getStat("").then(data=>
        {this.setState({
            items1 : tech.stuff,
            isLoaded : true,
          })}).then(spor.getStat("").then(data=>
            {this.setState({
              items2 : spor.stuff,
              isLoaded : true,
            })})).then(entr.getStat("").then(data=>
                {this.setState({
                  items3 : entr.stuff,
                  isLoaded : true,
                })}))
        this.setState({
            techer: tech,
            sporer: spor,
            entrer: entr,
        })
        
        
    }
    changeTech = () => {
        this.setState({tech: true, entr: false, sprt:false});
      }
    changeEntr = () => {
        this.setState({tech: false, entr: true, sprt:false});
      }
    changeSprt = () => {
        this.setState({tech: false, entr: false, sprt:true});
      }
    churnURL(s)
    {
        const {tech, entr, sprt} = this.state;
        if(s == null) 
        {
            if(tech){
                return "https://images.pexels.com/photos/1089440/pexels-photo-1089440.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            }
            if(sprt)
            {
                return "https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            }
            if(entr)
            {
                return "https://images.pexels.com/photos/33129/popcorn-movie-party-entertainment.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            }
        }
        else return s
    }
    removeDup(ar)
    {
        var res = []
        var alreadySeen = []
        for(var i = 0; i<ar.length; i++)
        {
            if(!alreadySeen.includes(ar[i].title))
            {
                res.push(ar[i])
                alreadySeen.push(ar[i].title)
            }
        }
        return res
    }
    narrowSearch = (event) => {
        this.setState({term: event.target.value});
        let tech = new News("technology")
        let spor = new News("sports")
        let entr = new News("entertainment")
        
        tech.getStat(event.target.value).then(data=>
        {this.setState({
            items1 : tech.stuff,
            isLoaded : true,
          })}).then(spor.getStat(event.target.value).then(data=>
            {this.setState({
              items2 : spor.stuff,
              isLoaded : true,
            })})).then(entr.getStat(event.target.value).then(data=>
                {this.setState({
                  items3 : entr.stuff,
                  isLoaded : true,
                })}))
        
      }
    
    refineTime(time)
    {
//BAD TODO FIX
        var year = time.substring(0,4)
        var month = time.substring(5,7)
        var day = time.substring(8,10)
        var min = time.substring(14,16)
        var hour = Number(time.substring(11,13)) % 12
        switch(Number(month)%12)
        {
            case 0: month = "December"; break;
            case 1: month = "January"; break;
            case 2: month = "February"; break;
            case 3: month = "March"; break;
            case 4: month = "April"; break;
            case 5: month = "May"; break;
            case 6: month = "June"; break;
            case 7: month = "July"; break;
            case 8: month = "August"; break;
            case 9: month = "September"; break;
            case 10: month = "October"; break;
            case 11: month = "November"; break;
        }
    
        return month + " " + Number(day).toString() + ", "+ year + " at " + hour + ":" + min + " UTC"
        
    }
    refineBio(pub,author)
    {
        if(author == null || author == "") return pub
        return pub + " | " + author
    }
    DisplayBlock(it)
    { 
        return this.removeDup(it).map(item => (
            <div class="entry">
                <img src={this.churnURL(item.urlToImage)} class="newImage" align="left"></img>
            <h4>{item.title}</h4>
            <p>{this.refineBio(this.refineTime(item.publishedAt),item.author)}</p>
            <a href={item.url}>Click here for more</a>
        
             </div>
            ))
    }
    render() {
        
        const {isLoaded, items1, items2, items3, tech, entr, sprt} = this.state;
        if (!isLoaded)
            return <div>Loading...</div>;
        if(tech)
        return (
            <div className="App">
                <h1 class = "cat">Technology</h1>
                <div class = "nav">
                <div onClick={this.changeTech} class = "techInput">Tech</div>
                <div onClick={this.changeEntr} class = "entrInput">Entertainment</div>
                <div onClick={this.changeSprt} class = "sprtInput">Sports</div>
                </div>
                <div class = "text"><input type="text" onChange={this.narrowSearch} /></div>
                {this.DisplayBlock(items1)}
            </div>
        );
        else if (sprt) return (
            <div className="App">
                <h1 class = "cat"> Sports </h1>
                <div class = "nav">
                <div onClick={this.changeTech} class = "techInput">Tech</div>
                <div onClick={this.changeEntr} class = "entrInput">Entertainment</div>
                <div onClick={this.changeSprt} class = "sprtInput">Sports</div>
                </div>
                <div class = "text"><input type="text" onChange={this.narrowSearch} /></div>
                {this.DisplayBlock(items2)}
            </div>
        );
        else if (entr) return(
            <div className="App">
                <h1 class = "cat"> Entertainment </h1>
                <div class = "nav">
                <div onClick={this.changeTech} class = "techInput">Tech</div>
                <div onClick={this.changeEntr} class = "entrInput">Entertainment</div>
                <div onClick={this.changeSprt} class = "sprtInput">Sports</div>
                </div>
                <div class = "text"><input type="text" onChange={this.narrowSearch} /></div>
                
                {this.DisplayBlock(items3)}
            </div>
        );
    }
        

}

export default App;