
import { Component } from '@angular/core';

@Component({
  selector: 'image-loader-spinner',
  template: `
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="uil-default">
      <rect x="0" y="0" width="100" height="100" fill="none" class="bk"></rect>
      <rect x="49" y="42" width="2" height="16" rx="0" ry="0" fill="#9C9C9C" transform="rotate(0 50 50) translate(0 -25)">
        <animate attributeName="opacity" from="1" to="0" dur=".75s" begin="0s" repeatCount="indefinite"/>
      </rect>
      <rect x="49" y="42" width="2" height="16" rx="0" ry="0" fill="#9C9C9C" transform="rotate(22.5 50 50) translate(0 -25)">
        <animate attributeName="opacity" from="1" to="0" dur=".75s" begin="0.046875s" repeatCount="indefinite"/>
      </rect>
      <rect x="49" y="42" width="2" height="16" rx="0" ry="0" fill="#9C9C9C" transform="rotate(45 50 50) translate(0 -25)">
        <animate attributeName="opacity" from="1" to="0" dur=".75s" begin="0.09375s" repeatCount="indefinite"/>
      </rect>
      <rect x="49" y="42" width="2" height="16" rx="0" ry="0" fill="#9C9C9C" transform="rotate(67.5 50 50) translate(0 -25)">
        <animate attributeName="opacity" from="1" to="0" dur=".75s" begin="0.140625s" repeatCount="indefinite"/>
      </rect>
      <rect x="49" y="42" width="2" height="16" rx="0" ry="0" fill="#9C9C9C" transform="rotate(90 50 50) translate(0 -25)">
        <animate attributeName="opacity" from="1" to="0" dur=".75s" begin="0.1875s" repeatCount="indefinite"/>
      </rect>
      <rect x="49" y="42" width="2" height="16" rx="0" ry="0" fill="#9C9C9C" transform="rotate(112.5 50 50) translate(0 -25)">
        <animate attributeName="opacity" from="1" to="0" dur=".75s" begin="0.234375s" repeatCount="indefinite"/>
      </rect>
      <rect x="49" y="42" width="2" height="16" rx="0" ry="0" fill="#9C9C9C" transform="rotate(135 50 50) translate(0 -25)">
        <animate attributeName="opacity" from="1" to="0" dur=".75s" begin="0.28125s" repeatCount="indefinite"/>
      </rect>
      <rect x="49" y="42" width="2" height="16" rx="0" ry="0" fill="#9C9C9C" transform="rotate(157.5 50 50) translate(0 -25)">
        <animate attributeName="opacity" from="1" to="0" dur=".75s" begin="0.328125s" repeatCount="indefinite"/>
      </rect>
      <rect x="49" y="42" width="2" height="16" rx="0" ry="0" fill="#9C9C9C" transform="rotate(180 50 50) translate(0 -25)">
        <animate attributeName="opacity" from="1" to="0" dur=".75s" begin="0.375s" repeatCount="indefinite"/>
      </rect>
      <rect x="49" y="42" width="2" height="16" rx="0" ry="0" fill="#9C9C9C" transform="rotate(202.5 50 50) translate(0 -25)">
        <animate attributeName="opacity" from="1" to="0" dur=".75s" begin="0.421875s" repeatCount="indefinite"/>
      </rect>
      <rect x="49" y="42" width="2" height="16" rx="0" ry="0" fill="#9C9C9C" transform="rotate(225 50 50) translate(0 -25)">
        <animate attributeName="opacity" from="1" to="0" dur=".75s" begin="0.46875s" repeatCount="indefinite"/>
      </rect>
      <rect x="49" y="42" width="2" height="16" rx="0" ry="0" fill="#9C9C9C" transform="rotate(247.5 50 50) translate(0 -25)">
        <animate attributeName="opacity" from="1" to="0" dur=".75s" begin="0.515625s" repeatCount="indefinite"/>
      </rect>
      <rect x="49" y="42" width="2" height="16" rx="0" ry="0" fill="#9C9C9C" transform="rotate(270 50 50) translate(0 -25)">
        <animate attributeName="opacity" from="1" to="0" dur=".75s" begin="0.5625s" repeatCount="indefinite"/>
      </rect>
      <rect x="49" y="42" width="2" height="16" rx="0" ry="0" fill="#9C9C9C" transform="rotate(292.5 50 50) translate(0 -25)">
        <animate attributeName="opacity" from="1" to="0" dur=".75s" begin="0.609375s" repeatCount="indefinite"/>
      </rect>
      <rect x="49" y="42" width="2" height="16" rx="0" ry="0" fill="#9C9C9C" transform="rotate(315 50 50) translate(0 -25)">
        <animate attributeName="opacity" from="1" to="0" dur=".75s" begin="0.65625s" repeatCount="indefinite"/>
      </rect>
      <rect x="49" y="42" width="2" height="16" rx="0" ry="0" fill="#9C9C9C" transform="rotate(337.5 50 50) translate(0 -25)">
        <animate attributeName="opacity" from="1" to="0" dur=".75s" begin="0.703125s" repeatCount="indefinite"/>
      </rect>
    </svg>
  `,
  styles: [
    'svg {max-width: 75px; margin: auto; float: none; display: block;}'
  ]
})
export class ImageLoaderSpinnerCmp { }