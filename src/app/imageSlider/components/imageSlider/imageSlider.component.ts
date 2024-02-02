import { Component, Input } from "@angular/core";
import { SlideInterface } from "../../types/slide.interface";

@Component({
    selector: 'image-slider',
    templateUrl: './imageSlider.component.html',
    styleUrls: ['./imageSlider.component.scss'],
})
export class ImageSliderComponent{
    @Input() slides: SlideInterface [] = [];

    currentIndex: number = 0;

    goToNext(): void {
        const isLastSlide = this.currentIndex === this.slides.length -1
        const newIndex = isLastSlide ? 0 : this.currentIndex + 1;
        this.currentIndex=newIndex;
    }

    goToPrevious(): void {
        const isFirstSlide = this.currentIndex  === 0
        const newIndex = isFirstSlide 
            ? this.slides.length -1
            : this.currentIndex -1;
        this.currentIndex=newIndex;
    }

    goToSlide(slideIndex: number): void{
        this.currentIndex = slideIndex;
    }

    getCurrentSlideUrl(): string {
        return `url('${this.slides[this.currentIndex].url}')`;
    }
}