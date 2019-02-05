import React from 'react';
import axios from 'axios';
import FridgeDetailedInfo from './fridge/fridgeDetailedInfo';
import DeviceSet from './DeviceSet';

class DeviceDetailedInfo extends React.Component {
    state = {
        meta: {},
        data: {},
        config: {},
    };

    componentDidMount() {
        let id = this.props.match.params.id
        axios.get('http://localhost:3301/devices/' + id + '/data')
            .then(({ data }) => {
                this.setState({
                    meta: data.meta,
                    data: data.data
                });
            })
            .catch(function (error) {
                console.log(error);
            });

        axios.get('http://localhost:3301/devices/' + id + '/config')
            .then(({ data }) => {
                this.setState({
                    config: data
                });
            })
            .catch(function (error) {
                console.log(error);
            });
        console.dir(this.state.config)
        console.dir(this.state.meta)
        console.dir(this.state.data)
        global.reactHistory = this.props.history;
    }

    showDetailedInfo = () => {
        switch (this.state.meta.type) {
            case 'fridge': {
                return <FridgeDetailedInfo
                    id={this.props.match.params.id}
                    config={this.state.config}
                    meta={this.state.meta}
                    data={this.state.data}
                />
                break;
            }
        }
    }

    render() {
        return (
            <div>
                <DeviceSet></DeviceSet>
                {this.showDetailedInfo()}
            </div>
        );
    }
}

export default DeviceDetailedInfo;
