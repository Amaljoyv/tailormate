// import { Pipe, PipeTransform } from '@angular/core';

// @Pipe({
//   name: 'filter'
// })
// export class FilterPipe implements PipeTransform {

//   transform(allOrders:any[],searchTerm:string,propertyName:string): any[] {
//     const result:any=[]
//     if(!allOrders || searchTerm=="" || propertyName==""){
//       return allOrders
//     }
//     allOrders.forEach((item:any)=>{
//       if(item[propertyName].trim().toLowerCase().includes(searchTerm.trim().toLowerCase())){
//         result.push(item)
//       }
//     })
//     return result;
//   }

// }


import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(allOrders: any[], searchTerm: string, propertyName: string): any[] {
    const result: any[] = [];
    if (!allOrders || searchTerm === "" || propertyName === "") {
      return allOrders;
    }

    allOrders.forEach((item: any) => {
      if (propertyName === "mobileNumber") {
        if (item[propertyName].toString().includes(searchTerm.trim())) {
          result.push(item);
        }
      } else if (propertyName === "date") {
        // Assuming your date is in string format, you can use any date manipulation library if it's in Date format
        const formattedDate = new Date(item[propertyName]).toLocaleDateString('en-US'); // Example format, adjust as needed
        if (formattedDate.includes(searchTerm.trim())) {
          result.push(item);
        }
      } else {
        // For other properties, perform the default filtering
        if (item[propertyName].trim().toLowerCase().includes(searchTerm.trim().toLowerCase())) {
          result.push(item);
        }
      }
    });
    return result;
  }
}
