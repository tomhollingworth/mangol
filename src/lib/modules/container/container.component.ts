import { Component, Input, Output, OnInit, HostBinding, EventEmitter } from '@angular/core';

import { MangolMapService } from './../../services/_index';

import * as ol from 'openlayers';

@Component({
  selector: 'mangol',
  templateUrl: './container.component.html',
  providers: [MangolMapService]
})
export class MangolContainerComponent implements OnInit {

  @HostBinding('class') class = 'mangol';

  @Input() config: any;
  @Output() mapReady = new EventEmitter();
  map: ol.Map;
  isOpened: boolean;
  service: MangolMapService;

  constructor(private mapService: MangolMapService) {
    this.service = this.mapService;
  }

  ngOnInit(): any {
    // generate a default config if there is none
    if (typeof this.config === 'undefined') {
      this.config = {
        map: {
          renderer: 'canvas',
          target: 'demo-simple-map',
          view: {
            projection: 'EPSG:900913',
            center: ol.proj.fromLonLat([19.3956393810065, 47.168464955013], 'EPSG:900913'),
            zoom: 7
          },
          layers: [
            {
              type: 'layer',
              name: 'OpenStreetMap layer',
              layer: new ol.layer.Tile({
                source: new ol.source.OSM()
              })
            }
          ]
        }
      };
    }

    try {
      this.isOpened = this.config.sidebar.opened;
    } catch (error) {
      this.isOpened = true;
    }
  }

  mapCreated(map: ol.Map): void {
    this.map = map;
    this.map.updateSize();
    this.mapReady.emit({ mapService: this.service });
  }

  sidebarToggled(): void {
    this.isOpened = !this.isOpened;
  }

  updateMap(): void {
    this.map.updateSize();
  }

}
