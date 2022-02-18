using System.Collections.Generic;

namespace BloodDonation_BackEnd.Models
{
    public class Response
    {
        public int responseCode { get; set; }
        public string responseMessage { get; set; }
        public UserMaster user { get; set; }
        public List<Request> lstRequest { get; set; }
        public List<UserMaster> lstDonors { get; set; }
        public List<BloodBank> lstBloodBanks { get; set; }
        public List<Stock> lstStock { get; set; }
        public List<Campaign> lstCampaign { get; set; }
    }
    public class DonorRegistrationResponse
    {
        public int responseCode { get; set; }
        public string responseMessage { get; set; }
    }

    public class SeekerRegistrationResponse
    {
        public int responseCode { get; set; }
        public string responseMessage { get; set; }
    }

    public class HospitalRegisterationResponse
    {
        public int responseCode { get; set; }
        public string responseMessage { get; set; }
    }
}