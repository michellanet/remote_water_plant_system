using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SVPlantsAPI.Models
{
    public class Plant
    {
        [Key]
        public int Id { get; set; }
        [Column(TypeName = "nvarchar(100)")]
        public string PlantName { get; set; }
        [Column(TypeName = "nvarchar(100)")]
        public string PlantPhotoFileName { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime WaterStartTime { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime WaterEndTime { get; set; }
    }
}
