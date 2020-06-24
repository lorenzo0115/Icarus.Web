import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

import { CustomerSiteService } from '../../pages/customer/customer-site/_core';
import { CommonService } from 'src/app/core';

@Component({
  selector: 'app-tree-filter',
  templateUrl: './tree-filter.component.html',
  styleUrls: ['./tree-filter.component.css'],
})
export class TreeFilterComponent implements OnInit, OnChanges {
  constructor(
    private readonly _commonService: CommonService,
    private readonly _customerSiteService: CustomerSiteService
  ) {}

  @Input() Original_Records: any;
  @Input() Site_ID;
  @Input() Estimate_ID;

  Sites_Output: any;

  @Output() Emitter_Trees: any = new EventEmitter<any>();

  SearchSiteTrees: any = {
    TreeTypeID: [],
    TreeRatingID: [],
    DiameterBreastHeightID: [],
    Near_Powerline: [],
    Near_Building: [],
    HardscapeDamageTypeID: [],
  };

  Near_Powerline_Options: any = [
    {
      Value: false,
      Text: 'Not Near Electricity',
      Class: 'fa fa-bolt',
    },
    {
      Value: true,
      Text: 'Near Electricity',
      Class: 'fa fa-bolt text-warning',
    },
  ];

  Near_Building_Options: any = [
    {
      Value: false,
      Text: 'Not Near Structure',
      Class: 'fa fa-building',
    },
    {
      Value: true,
      Text: 'Near Structure',
      Class: 'fa fa-building text-warning',
    },
  ];

  HardscapeDamage_Options: any = [
    {
      Value: 1,
      Text: 'No Hardscape Damage',
      Class: 'fa fa-road',
    },
    {
      Value: 3,
      Text: 'Potential Hardscape Damage',
      Class: 'fa fa-road text-warning',
    },
    {
      Value: 2,
      Text: 'Causing Hardscape Damage',
      Class: 'fa fa-road text-danger',
    },
  ];

  Tree_Rating = [];
  Diameter_Breast_Height = [];
  Tree_Types = [];

  SideLine = [];
  Qualifiers = [];

  Near_Electricy_Selction_List;

  Test = [];

  ngOnInit(): void {
    this.get_Tree_Types();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.Original_Records.length > 0) {
      this.filter();
    }
  }

  get_Tree_Types() {
    if (this.Site_ID) {
      this._customerSiteService
        .getSiteSpeciesSummary(this.Site_ID)
        .subscribe((data: any) => this.get_Tree_Types_OnSuccess(data));
    }
  }

  get_Tree_Types_OnSuccess(data) {
    this.Tree_Types = data;

    this.Tree_Types.forEach((x) => {
      x.Value = x.TreeTypeID;
    });

    this.get_Tree_Ratings();
  }

  get_Tree_Ratings() {
    this._commonService.getTreeRating().subscribe((data: any) => {
      this.get_Tree_Ratings_OnSuccess(data);
    });
  }

  Filter_Selected(record, Container, Property) {
    record.Selected = !record.Selected;

    if (!record.Selected) {
      // Un-Selecting Filter
      Container.splice(Container.indexOf(record.Value), 1);
      this.Prepare_Test();

      if (Container.length === 0) {
        // Filter is now empty;  All Records in Sideline are now POTENTIALLY eligible to move rooms.
        for (let i = this.SideLine.length - 1; i >= 0; i--) {
          if (this.Take_Test(this.SideLine[i])) {
            this.Move_Room(this.SideLine[i], this.SideLine, this.Qualifiers);
          }
        }
      } else {
        // Filter is not empty. Records who matched this property now leave the room.
        for (let i = this.Qualifiers.length - 1; i >= 0; i--) {
          const c1 = Object.keys(this.Qualifiers[i]).map((key) => {
            return {
              key: key,
              value: this.Qualifiers[i][key],
            };
          });

          c1.forEach((rrr) => {
            if (rrr.key === Property) {
              if (rrr.value === record.Value) {
                this.Move_Room(this.Qualifiers[i], this.Qualifiers, this.SideLine);
              }
            }
          });
        }
      }
    } else {
      // Selecting Filter
      Container.push(record.Value);
      this.Prepare_Test();

      if (Container.length === 1) {
        // Filter now has 1 record. Match or get out.
        for (let i = this.Qualifiers.length - 1; i >= 0; i--) {
          const c1 = Object.keys(this.Qualifiers[i]).map((key) => {
            return {
              key: key,
              value: this.Qualifiers[i][key],
            };
          });

          c1.forEach((rrr) => {
            if (rrr.key === Property) {
              if (rrr.value !== record.Value) {
                this.Move_Room(this.Qualifiers[i], this.Qualifiers, this.SideLine);
              }
            }
          });
        }
      } else {
        // Filter now has more than 1 record, Records who match this property are now POTENTIALLY eligible to move rooms.
        for (let i = this.SideLine.length - 1; i >= 0; i--) {
          const c1 = Object.keys(this.SideLine[i]).map((key) => {
            return {
              key: key,
              value: this.SideLine[i][key],
            };
          });

          c1.forEach((rrr) => {
            if (rrr.key === Property) {
              if (rrr.value === record.Value) {
                if (this.Take_Test(this.SideLine[i])) {
                  this.Move_Room(this.SideLine[i], this.SideLine, this.Qualifiers);
                }
              }
            }
          });
        }
      }
    }

    this.ResetFilterCounts();
  }

  Move_Room(record: any, origin: Array<any>, destination: Array<any>) {
    destination.push(Object.assign({}, record));
    origin.splice(origin.indexOf(record), 1);
  }

  Take_Test(record) {
    let Pass = true;

    const current = Object.keys(record).map((key) => {
      return {
        key: key,
        value: record[key],
      };
    });

    this.Test.forEach((question: any) => {
      current.forEach(function (rrr) {
        if (!Pass) {
          return;
        }

        if (rrr.key === question.Property) {
          if (question.Options.indexOf(rrr.value) > -1) {
          } else {
            Pass = false;
          }
        }
      });
    });

    return Pass;
  }

  Prepare_Test() {
    this.Test = [];

    if (this.SearchSiteTrees.Near_Powerline.length > 0) {
      this.Test.push({ Options: this.SearchSiteTrees.Near_Powerline, Property: 'Near_Powerline' });
    }

    if (this.SearchSiteTrees.Near_Building.length > 0) {
      this.Test.push({ Options: this.SearchSiteTrees.Near_Building, Property: 'Near_Building' });
    }

    if (this.SearchSiteTrees.TreeRatingID.length > 0) {
      this.Test.push({ Options: this.SearchSiteTrees.TreeRatingID, Property: 'TreeRatingID' });
    }

    if (this.SearchSiteTrees.DiameterBreastHeightID.length > 0) {
      this.Test.push({ Options: this.SearchSiteTrees.DiameterBreastHeightID, Property: 'DiameterBreastHeightID' });
    }

    if (this.SearchSiteTrees.TreeTypeID.length > 0) {
      this.Test.push({ Options: this.SearchSiteTrees.TreeTypeID, Property: 'TreeTypeID' });
    }

    if (this.SearchSiteTrees.HardscapeDamageTypeID.length > 0) {
      this.Test.push({ Options: this.SearchSiteTrees.HardscapeDamageTypeID, Property: 'HardscapeDamageTypeID' });
    }
  }

  get_Tree_Ratings_OnSuccess(data) {
    this.Tree_Rating = data;
    this.get_DiameterBreastHeight();
  }

  get_DiameterBreastHeight() {
    this._commonService.getDiameterHeight().subscribe((data: any) => {
      this.get_DiameterBreastHeight_OnSuccess(data);
    });
  }

  get_DiameterBreastHeight_OnSuccess(data) {
    this.Diameter_Breast_Height = data;
    this.filter();
  }

  emit_Sites() {
    const emitThis = { species: this.Tree_Types, trees: this.Qualifiers };
    this.Emitter_Trees.emit(emitThis);
  }

  filter() {
    this.Qualifiers = Object.assign([], this.Original_Records);
    /// 3.31.20 this.Sites_Output = this.Qualifiers; ////////////////////////////////

    this.ResetFilterCounts();
  }

  ResetFilterCounts() {
    this.Near_Powerline_Options?.forEach((_, index, origin) => {
      origin[index].Count = 0;
    });

    this.Near_Building_Options?.forEach((_, index, origin) => {
      origin[index].Count = 0;
    });

    this.HardscapeDamage_Options?.forEach((_, index, origin) => {
      origin[index].Count = 0;
    });

    this.Tree_Rating?.forEach((_, index, origin) => {
      origin[index].Count = 0;
    });

    this.Diameter_Breast_Height?.forEach((_, index, origin) => {
      origin[index].Count = 0;
    });

    this.Tree_Types?.forEach((_, index, origin) => {
      origin[index].Count = 0;
    });

    for (const record of this.Qualifiers) {
      const powerOpt = this.Near_Powerline_Options.find((x) => x.Value === record.Near_Powerline);
      const buildingOpt = this.Near_Building_Options.find((x) => x.Value === record.Near_Building);
      const damageOpt = this.HardscapeDamage_Options.find((x) => x.Value === record.HardscapeDamageTypeID);
      const ratingOpt = this.Tree_Rating.find((x) => x.Value === record.TreeRatingID);
      const diameterOpt = this.Diameter_Breast_Height.find((x) => x.Value === record.DiameterBreastHeightID);
      const typeOpt = this.Tree_Types.find((x) => x.Value === record.TreeTypeID);

      if (powerOpt) powerOpt.Count += 1;
      if (buildingOpt) buildingOpt.Count += 1;
      if (damageOpt) damageOpt.Count += 1;
      if (ratingOpt) ratingOpt.Count += 1;
      if (diameterOpt) diameterOpt.Count += 1;
      if (typeOpt) typeOpt.Count += 1;
    }

    this.emit_Sites();
  }

  isShowClearBtn(): boolean {
    return true;
  }
}
