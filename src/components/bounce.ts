// tslint:disable: no-console
// tslint:disable: variable-name
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class Bounce extends Vue {


  private readonly radius = 40;
  private readonly height = 600;

  // The 0,0 coordinate is top left of the box
  // positive x is to the right
  // positive y is down
  //
  // (0,0)---------- x
  //   |
  //   |
  //   |
  //   |
  //   y

  private x: number = 0;
  private y: number = 500;
  static x: number;
  private vertical_speed: number = 0;
  private gravity: number = -1
  private jump_speed: number = 25
  private horizontal_boundary: Array = [500, 400, 300];
  private i: number = 0;
  private stage: number = 0;
  private get circle(): Element {
    return this.$refs.circle as Element;
  }

  @Prop() private msg!: string;
  public mounted() {
    setInterval(this.bounce, 100);
    
  }
  
  public bounce() { // this gets called every x ms -> update the position iteratively
    console.log(`called bounce function`);
    console.log(`after ${this.y}`);
    if (this.stage == 0) {
      if (this.y == 500) {
        this.x += 30;
        if (this.x > 800) {
          this.y = 100;
        }
      }
      if (this.y == 100) {
        this.x -= 30;
        if (this.x < -200) {
          this.y = 0;
          this.x = 0;
          this.stage = 1;
          }
      }
    }

    if (this.i != 3 && this.stage ==1) {
      this.vertical_speed += this.gravity;
      this.y-= this.vertical_speed;
      this.x += 4;
      if (this.y >= this.horizontal_boundary[this.i] && this.vertical_speed < 0) {
        this.vertical_speed = this.jump_speed;
        this.i += 1;
        }
      
    };
  }

  public get cx() {
    return this.x.toString();
  }

  public get cy() {
    return this.y.toString();
  }


}
