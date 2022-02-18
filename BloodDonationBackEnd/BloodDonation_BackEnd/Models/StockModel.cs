using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BloodDonation_BackEnd.Models
{
    public class StockModel
    {
        public int ID { get; set; }
        public string BloodGroup { get; set; }
        public string Unit { get; set; }
        public Nullable<System.DateTime> InsertedON { get; set; }
    }
}