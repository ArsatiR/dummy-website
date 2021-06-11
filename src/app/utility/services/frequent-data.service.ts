import { Injectable } from '@angular/core';

export class FrequentDataService {
  constructor() { }

  async setUser(user:any): Promise<void>{
    await localStorage.setItem('user', user)
  }

  getUser(){
    return localStorage.getItem('user')
  }

}
