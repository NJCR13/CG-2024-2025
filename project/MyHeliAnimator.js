export class MyHeliAnimator
{
    constructor(start, end, startTime, duration)
    {
        this.startVal=start;
        this.endVal=end;
        this.animStartTimeSecs=startTime;
        this.animDurationSecs=duration;
        this.length=(this.endVal-this.startVal);

        this.animVal=this.startVal; // altura
    }

    
    update(t)
    {
      // Animation based on elapsed time since animation start
      var elapsedTimeSecs=t-this.animStartTimeSecs;
      var u = Math.min(Math.max(elapsedTimeSecs / this.animDurationSecs, 0), 1);

    //   if (elapsedTimeSecs>=0 && elapsedTimeSecs<=this.animDurationSecs)
          this.animVal=this.startVal + u * this.length;
    }
}