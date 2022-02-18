using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BloodDonation_BackEnd.Models
{
    public class RequestModel
    {
        public int ID { get; set; }
        public string RequestContent { get; set; }
        public string RequestType { get; set; }
        public string RequestFrom { get; set; }
        public string Type { get; set; }
        public string RequestStatus { get; set; }
        public Nullable<System.DateTime> InsertedON { get; set; }
    }
}