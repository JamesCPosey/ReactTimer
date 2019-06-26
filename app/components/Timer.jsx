var React = require('react');
var Clock = require('Clock');
var Controls = require('Controls');

var Timer = React.createClass({
    getInitialState: function (){
        return {
            count:0,
            timerStatus: 'stopped' 
        };
    },
    componentDidUpdate: function (prevProps, prevState) {
        if(this.state.timerStatus !== prevState.timerStatus) {
            switch (this.state.timerStatus) {
                case 'started':
                    this.startTimer();
                    break;
                case 'stopped':
                    this.setState({count: 0});
                    clearInterval(this.timer)
                    break;
                case 'paused': 
                clearInterval(this.timer)
                this.timer = undefined;
                break;
            }
        }
    },
    startTimer: function () {
        this.timer = setInterval(() => {
            var newCount = this.state.count +1;
            this.setState({
                count: newCount
            });
        }, 1000);
    },
    componentWillUnmount: function (){
        clearInterval(this.timer);
        this.timer = undefined;
    },
    handleStatusChange: function (newStatus) {
        this.setState({timerStatus: newStatus});
    },
    render: function () {
        var {count, timerStatus} = this.state;
        var renderControlArea = () => {
            if(timerStatus !== 'stopped'){
                return <Controls countdownStatus={timerStatus} onStatusChange={this.handleStatusChange}/>
            } else {
               return <CountdownForm onSetCountdown={this.handleSetCountdown}/>
            }
        };
        return (
            <div>
                <h1 className="page-title">Timer</h1>
                <Clock totalSeconds={count}/>
                <Controls countdownStatus={timerStatus} onStatusChange={this.handleStatusChange}/>
            </div>
    );
        }
});

module.exports= Timer;