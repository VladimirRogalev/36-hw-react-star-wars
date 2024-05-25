import React from 'react';
import "../css/contact.css";
import {BASE_URL, period_month} from "../utils/constants";

class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            planets: ['wait...']
        };
    }

    async fillPlanets(url) {
        const response = await fetch(url);
        const json = await response.json();
        const planets = json.map(item => item.name);
        this.setState({planets});
        const info = {
            payload: planets,
            time: Date.now()
        }
        localStorage.setItem('planets', JSON.stringify(info));
    }

    componentDidMount() {
        const planets = JSON.parse(localStorage.getItem('planets'));
        if (planets && ((Date.now() - planets.time) < period_month)) {
            this.setState({ planets: planets.payload });
        } else {
            this.fillPlanets(`${BASE_URL}/v1/planets`);
        }
    }

    componentWillUnmount() {
        console.log('Contact unmounted')
    }

    render() {
        return (
            <div>
                <form onSubmit={(e) => {
                    e.preventDefault();
                }}>
                    <label>First Name
                        <input type="text" name="firstname" placeholder="Your name.."/>
                    </label>
                    <label>Planet
                        <select name="planet">{
                            this.state.planets.map((item, index) => <option value={item} key={index}>{item}</option>)
                        }
                        </select>
                    </label>
                    <label>Subject
                        <textarea name="subject" placeholder="Write something.."/>
                    </label>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        )
    }
}

export default Contact