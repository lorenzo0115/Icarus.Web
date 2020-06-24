import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mapMarker',
})
export class MapMarkerPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    const mapType = args[0];
    const isShowCompletedTree = args[1] ?? false;

    let iconUrl;
    switch (mapType) {
      case 'site':
        iconUrl =
          'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=|' + value.Company_Color.replace('#', '');
        break;
      case 'tree':
        iconUrl =
          isShowCompletedTree && value.Completed
            ? {
                url: 'http://maps.google.com/mapfiles/kml/shapes/triangle.png',
                scaledSize: {
                  width: 32,
                  height: 32,
                },
              }
            : 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=|' + value.Color.replace('#', '');
        break;
      default:
        break;
    }

    return iconUrl;
  }
}
