using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BloodDonation_BackEnd.Models
{
    public class CampaignModel
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Location { get; set; }
        public Nullable<System.DateTime> CampaignDate { get; set; }
    }
}