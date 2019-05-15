import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

  protected contentSwitcherOptions = [
    {
      label: 'Current Users',
      value: 'user-list'
    },
    {
      label: 'User Groups',
      value: 'user-groups'
    }
  ];

  constructor(
    private router: Router
  ) {}

  ngOnInit() {
  }

  /**
   * redirect the user to the selected view from the content switcher
   * @param selectedTab
   */
  subNavChanged(selectedTab) {
    if (selectedTab.value === 'user-list') {
      this.router.navigate(['/user/user-management/list']);
    } else if (selectedTab.value === 'user-groups') {
      this.router.navigate(['/user/user-management/groups']);
    }
  }

}
