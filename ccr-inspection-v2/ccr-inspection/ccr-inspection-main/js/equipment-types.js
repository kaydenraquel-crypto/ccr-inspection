/* ============================================
   Equipment Type Configuration
   All 33 equipment types with inspection checklists
   ============================================ */

var EQUIPMENT_TYPES = {

  walk_in_freezer: {
    name: "Walk-In Freezer",
    icon: "\u2744\uFE0F",
    sections: [
      {
        id: "door_frame",
        title: "Door & Frame Condition",
        type: "checklist",
        items: [
          { id: "closes_square", label: "Door closes fully and square" },
          { id: "rubbing", label: "Door rubbing frame or floor" },
          { id: "self_closing", label: "Self-closer returns door to sealed position" },
          { id: "frame_secure", label: "Frame securely attached to wall/panels" },
          { id: "frame_corrosion", label: "No visible corrosion or damage on frame" }
        ],
        notesField: true
      },
      {
        id: "hinges_hardware",
        title: "Hinges & Hardware",
        type: "checklist",
        items: [
          { id: "hinge_bolts", label: "Hinge bolts/screws tight" },
          { id: "hinge_pin", label: "Hinge pins not worn or loose" },
          { id: "cam_rise", label: "Cam-rise hinge lifting properly" },
          { id: "spring_tension", label: "Spring tension adequate" },
          { id: "hinge_corrosion", label: "No corrosion or ice buildup on hinges" }
        ],
        notesField: true
      },
      {
        id: "gasket",
        title: "Gasket / Seal Condition",
        type: "checklist",
        items: [
          { id: "gasket_intact", label: "Gasket intact around full perimeter" },
          { id: "gasket_torn", label: "Gasket torn, cracked, or hardened" },
          { id: "gasket_seated", label: "Gasket properly seated in channel" },
          { id: "ice_on_gasket", label: "No ice buildup on or around gasket" },
          { id: "magnetic_seal", label: "Magnetic seal holding (if applicable)" }
        ],
        extraFields: [
          {
            id: "dollar_test",
            type: "radio",
            label: "Dollar-bill test passed",
            options: ["Yes", "No", "N/A"]
          }
        ],
        notesField: true
      },
      {
        id: "heater_wire",
        title: "Heater Wire / Anti-Sweat",
        type: "checklist",
        items: [
          { id: "heater_functional", label: "Heater wire functioning (warm to touch)" },
          { id: "condensation", label: "No condensation or ice on frame" },
          { id: "heater_wire_intact", label: "Wire/leads intact (no exposed wiring)" },
          { id: "heater_voltage", label: "Voltage reading within spec" }
        ],
        extraFields: [
          { id: "heater_voltage_reading", type: "text", label: "Voltage Reading (V)" }
        ],
        notesField: true
      },
      {
        id: "latch_closer",
        title: "Latch / Closer / Safety",
        type: "checklist",
        items: [
          { id: "latch_engages", label: "Latch engages and releases smoothly" },
          { id: "latch_alignment", label: "Strike/keeper aligned properly" },
          { id: "inside_release", label: "Inside safety release functional" },
          { id: "panic_hardware", label: "Panic hardware tested from inside" },
          { id: "closer_adjusted", label: "Closer speed/tension properly adjusted" }
        ],
        notesField: true
      },
      {
        id: "door_panel",
        title: "Door Panel Condition",
        type: "checklist",
        items: [
          { id: "panel_dents", label: "No dents, cracks, or punctures" },
          { id: "panel_delamination", label: "No delamination or bubbling" },
          { id: "panel_moisture", label: "No moisture inside panel (soft spots)" },
          { id: "kick_plate", label: "Kick plate secure (if equipped)" },
          { id: "curtain_strips", label: "Strip curtain intact (if equipped)" }
        ],
        notesField: true
      },
      {
        id: "refrigeration",
        title: "Refrigeration System",
        type: "checklist",
        items: [
          { id: "compressor_running", label: "Compressor running smoothly" },
          { id: "evap_fan", label: "Evaporator fan(s) operating" },
          { id: "condenser_clean", label: "Condenser coil clean" },
          { id: "temp_holding", label: "Temperature holding at setpoint" },
          { id: "defrost_working", label: "Defrost cycle functioning" }
        ],
        extraFields: [
          { id: "box_temp", type: "text", label: "Box Temperature (\u00B0F)" },
          { id: "setpoint_temp", type: "text", label: "Setpoint Temperature (\u00B0F)" }
        ],
        notesField: true
      },
      {
        id: "recommended_actions",
        title: "Recommended Actions",
        type: "checklist",
        items: [
          { id: "action_none", label: "No action needed - all items pass" },
          { id: "action_gasket", label: "Gasket replacement needed" },
          { id: "action_hinge", label: "Hinge repair/replacement needed" },
          { id: "action_heater", label: "Heater wire repair needed" },
          { id: "action_latch", label: "Latch/closer adjustment needed" },
          { id: "action_panel", label: "Panel repair needed" },
          { id: "action_refrigeration", label: "Refrigeration service needed" },
          { id: "action_other", label: "Other (see notes)" }
        ],
        extraFields: [
          {
            id: "priority",
            type: "radio",
            label: "Priority Level",
            options: ["Low", "Medium", "High", "Critical"]
          }
        ],
        notesField: true
      }
    ]
  },

  walk_in_cooler: {
    name: "Walk-In Cooler",
    icon: "\uD83E\uDDCA",
    sections: [
      {
        id: "door_frame",
        title: "Door & Frame Condition",
        type: "checklist",
        items: [
          { id: "closes_square", label: "Door closes fully and square" },
          { id: "rubbing", label: "Door rubbing frame or floor" },
          { id: "self_closing", label: "Self-closer returns door to sealed position" },
          { id: "frame_secure", label: "Frame securely attached to wall/panels" },
          { id: "frame_corrosion", label: "No visible corrosion or damage on frame" }
        ],
        notesField: true
      },
      {
        id: "gasket",
        title: "Gasket / Seal Condition",
        type: "checklist",
        items: [
          { id: "gasket_intact", label: "Gasket intact around full perimeter" },
          { id: "gasket_torn", label: "Gasket torn, cracked, or hardened" },
          { id: "gasket_seated", label: "Gasket properly seated in channel" },
          { id: "condensation_gasket", label: "No excessive condensation on gasket" },
          { id: "magnetic_seal", label: "Magnetic seal holding (if applicable)" }
        ],
        extraFields: [
          {
            id: "dollar_test",
            type: "radio",
            label: "Dollar-bill test passed",
            options: ["Yes", "No", "N/A"]
          }
        ],
        notesField: true
      },
      {
        id: "hinges_hardware",
        title: "Hinges & Hardware",
        type: "checklist",
        items: [
          { id: "hinge_bolts", label: "Hinge bolts/screws tight" },
          { id: "hinge_pin", label: "Hinge pins not worn or loose" },
          { id: "cam_rise", label: "Cam-rise hinge lifting properly" },
          { id: "spring_tension", label: "Spring tension adequate" },
          { id: "hinge_corrosion", label: "No corrosion on hinges" }
        ],
        notesField: true
      },
      {
        id: "latch_closer",
        title: "Latch / Closer / Safety",
        type: "checklist",
        items: [
          { id: "latch_engages", label: "Latch engages and releases smoothly" },
          { id: "latch_alignment", label: "Strike/keeper aligned properly" },
          { id: "inside_release", label: "Inside safety release functional" },
          { id: "closer_adjusted", label: "Closer speed/tension properly adjusted" }
        ],
        notesField: true
      },
      {
        id: "refrigeration",
        title: "Refrigeration System",
        type: "checklist",
        items: [
          { id: "compressor_running", label: "Compressor running smoothly" },
          { id: "evap_fan", label: "Evaporator fan(s) operating" },
          { id: "evap_clean", label: "Evaporator coil clean" },
          { id: "condenser_clean", label: "Condenser coil clean" },
          { id: "temp_holding", label: "Temperature holding at setpoint (33-38\u00B0F)" },
          { id: "defrost_working", label: "Defrost cycle functioning" },
          { id: "drain_clear", label: "Drain line clear and flowing" }
        ],
        extraFields: [
          { id: "box_temp", type: "text", label: "Box Temperature (\u00B0F)" },
          { id: "setpoint_temp", type: "text", label: "Setpoint Temperature (\u00B0F)" }
        ],
        notesField: true
      },
      {
        id: "interior",
        title: "Interior Condition",
        type: "checklist",
        items: [
          { id: "interior_clean", label: "Interior clean and sanitary" },
          { id: "shelving_secure", label: "Shelving secure and level" },
          { id: "floor_condition", label: "Floor in good condition (no cracks/standing water)" },
          { id: "light_working", label: "Interior light working" },
          { id: "no_odors", label: "No unusual odors" }
        ],
        notesField: true
      },
      {
        id: "recommended_actions",
        title: "Recommended Actions",
        type: "checklist",
        items: [
          { id: "action_none", label: "No action needed - all items pass" },
          { id: "action_gasket", label: "Gasket replacement needed" },
          { id: "action_hinge", label: "Hinge repair/replacement needed" },
          { id: "action_latch", label: "Latch/closer adjustment needed" },
          { id: "action_refrigeration", label: "Refrigeration service needed" },
          { id: "action_cleaning", label: "Deep cleaning recommended" },
          { id: "action_other", label: "Other (see notes)" }
        ],
        extraFields: [
          {
            id: "priority",
            type: "radio",
            label: "Priority Level",
            options: ["Low", "Medium", "High", "Critical"]
          }
        ],
        notesField: true
      }
    ]
  },

  ice_machine: {
    name: "Ice Machine",
    icon: "\uD83E\uddCA",
    sections: [
      {
        id: "ice_production",
        title: "Ice Production & Quality",
        type: "checklist",
        items: [
          { id: "production_rate", label: "Production rate meets specifications" },
          { id: "ice_clarity", label: "Ice is clear and properly formed" },
          { id: "ice_taste", label: "Ice tastes clean (no off-flavors)" },
          { id: "bin_full", label: "Bin full shutdown working properly" },
          { id: "harvest_cycle", label: "Harvest cycle completes normally" }
        ],
        notesField: true
      },
      {
        id: "water_system",
        title: "Water System",
        type: "checklist",
        items: [
          { id: "water_pressure", label: "Water pressure adequate (20-80 PSI)" },
          { id: "water_filter", label: "Water filter clean/recently changed" },
          { id: "inlet_valve", label: "Inlet valve functioning properly" },
          { id: "float_valve", label: "Float valve operating correctly" },
          { id: "no_leaks", label: "No leaks detected" }
        ],
        extraFields: [
          { id: "water_pressure_reading", type: "text", label: "Water Pressure (PSI)" }
        ],
        notesField: true
      },
      {
        id: "condenser_evap",
        title: "Condenser & Evaporator",
        type: "checklist",
        items: [
          { id: "condenser_clean", label: "Condenser coil clean and unobstructed" },
          { id: "condenser_fan", label: "Condenser fan operating properly" },
          { id: "evap_clean", label: "Evaporator plates clean" },
          { id: "hot_gas_valve", label: "Hot gas valve functioning (if equipped)" },
          { id: "no_frost", label: "No frost buildup on evaporator" }
        ],
        notesField: true
      },
      {
        id: "refrigeration",
        title: "Refrigeration System",
        type: "checklist",
        items: [
          { id: "compressor_smooth", label: "Compressor running smoothly" },
          { id: "no_unusual_noise", label: "No unusual noises or vibrations" },
          { id: "refrigerant_charge", label: "Proper refrigerant charge (frost pattern)" },
          { id: "compressor_amps", label: "Compressor amp draw within range" },
          { id: "discharge_temp", label: "Discharge line temperature normal" }
        ],
        extraFields: [
          { id: "compressor_amp_reading", type: "text", label: "Compressor Amps" },
          { id: "discharge_temp_reading", type: "text", label: "Discharge Temp (\u00B0F)" }
        ],
        notesField: true
      },
      {
        id: "cleaning_maintenance",
        title: "Cleaning & Maintenance",
        type: "checklist",
        items: [
          { id: "interior_clean", label: "Machine interior clean and sanitized" },
          { id: "bin_clean", label: "Bin clean and free of debris" },
          { id: "curtain_intact", label: "Curtain/shield in place and intact" },
          { id: "no_scale", label: "No scale buildup visible" },
          { id: "drain_clear", label: "Drain system clear and flowing" }
        ],
        notesField: true
      },
      {
        id: "safety_controls",
        title: "Safety & Controls",
        type: "checklist",
        items: [
          { id: "high_pressure_cutout", label: "High pressure cutout functional" },
          { id: "low_pressure_cutout", label: "Low pressure cutout functional" },
          { id: "control_board", label: "Control board showing no error codes" },
          { id: "safety_guards", label: "All safety guards in place" },
          { id: "electrical_tight", label: "Electrical connections tight and secure" }
        ],
        notesField: true
      },
      {
        id: "recommended_actions",
        title: "Recommended Actions",
        type: "checklist",
        items: [
          { id: "action_none", label: "No action needed - all items pass" },
          { id: "action_cleaning", label: "Cleaning/sanitizing needed" },
          { id: "action_filter", label: "Water filter replacement needed" },
          { id: "action_refrigeration", label: "Refrigeration service needed" },
          { id: "action_descale", label: "Descaling needed" },
          { id: "action_other", label: "Other (see notes)" }
        ],
        extraFields: [
          {
            id: "priority",
            type: "radio",
            label: "Priority Level",
            options: ["Low", "Medium", "High", "Critical"]
          }
        ],
        notesField: true
      }
    ]
  },

  reach_in_refrigerator: {
    name: "Reach-In Refrigerator",
    icon: "\uD83D\uDDC4\uFE0F",
    sections: [
      {
        id: "temperature",
        title: "Temperature Control",
        type: "checklist",
        items: [
          { id: "proper_temp", label: "Maintaining proper temperature (33-38\u00B0F)" },
          { id: "thermostat_accurate", label: "Thermostat accurate and responsive" },
          { id: "even_temp", label: "Even temperature throughout cabinet" },
          { id: "display_working", label: "Temperature display working (if digital)" },
          { id: "no_swings", label: "No temperature swings or cycling issues" }
        ],
        extraFields: [
          { id: "actual_temp", type: "text", label: "Actual Temp (\u00B0F)" }
        ],
        notesField: true
      },
      {
        id: "doors_gaskets",
        title: "Doors & Gaskets",
        type: "checklist",
        items: [
          { id: "doors_self_closing", label: "Doors close fully and self-closing" },
          { id: "gaskets_sealing", label: "Gaskets sealing properly (dollar bill test)" },
          { id: "gaskets_intact", label: "Gaskets intact with no tears or cracks" },
          { id: "hinges_tight", label: "Hinges tight and door aligned" },
          { id: "handles_secure", label: "Door handles secure" }
        ],
        notesField: true
      },
      {
        id: "compressor",
        title: "Compressor & Refrigeration",
        type: "checklist",
        items: [
          { id: "compressor_smooth", label: "Compressor running smoothly" },
          { id: "no_unusual_noise", label: "No unusual noises or vibrations" },
          { id: "refrigerant_charge", label: "Proper refrigerant charge (frost pattern)" },
          { id: "cycling_normal", label: "Compressor cycling normally" },
          { id: "cutouts_functional", label: "High/low pressure cutouts functional" }
        ],
        notesField: true
      },
      {
        id: "evaporator_defrost",
        title: "Evaporator & Defrost",
        type: "checklist",
        items: [
          { id: "evap_clean", label: "Evaporator coil clean and unobstructed" },
          { id: "evap_fan", label: "Evaporator fan running properly" },
          { id: "defrost_cycle", label: "Defrost cycle functioning correctly" },
          { id: "no_frost", label: "No excessive frost buildup" },
          { id: "drain_clear", label: "Drain line clear and flowing" }
        ],
        notesField: true
      },
      {
        id: "condenser",
        title: "Condenser System",
        type: "checklist",
        items: [
          { id: "condenser_clean", label: "Condenser coil clean" },
          { id: "condenser_fan", label: "Condenser fan operating properly" },
          { id: "adequate_airflow", label: "Adequate airflow around unit" },
          { id: "no_obstructions", label: "No obstructions blocking vents" },
          { id: "filter_clean", label: "Filter clean (if equipped)" }
        ],
        notesField: true
      },
      {
        id: "interior",
        title: "Interior Condition",
        type: "checklist",
        items: [
          { id: "interior_clean", label: "Interior clean and sanitary" },
          { id: "shelves_secure", label: "Shelves secure and level" },
          { id: "light_working", label: "Interior light working" },
          { id: "no_water", label: "No water pooling in bottom" },
          { id: "pan_slides", label: "Pan slides/drawer guides functioning" }
        ],
        notesField: true
      },
      {
        id: "recommended_actions",
        title: "Recommended Actions",
        type: "checklist",
        items: [
          { id: "action_none", label: "No action needed - all items pass" },
          { id: "action_gasket", label: "Gasket replacement needed" },
          { id: "action_refrigeration", label: "Refrigeration service needed" },
          { id: "action_defrost", label: "Defrost system repair needed" },
          { id: "action_cleaning", label: "Condenser cleaning needed" },
          { id: "action_other", label: "Other (see notes)" }
        ],
        extraFields: [
          {
            id: "priority",
            type: "radio",
            label: "Priority Level",
            options: ["Low", "Medium", "High", "Critical"]
          }
        ],
        notesField: true
      }
    ]
  },

  reach_in_freezer: {
    name: "Reach-In Freezer",
    icon: "\uD83E\uDDCA",
    sections: [
      {
        id: "temperature",
        title: "Temperature Control",
        type: "checklist",
        items: [
          { id: "proper_temp", label: "Maintaining proper temperature (-10 to 0\u00B0F)" },
          { id: "thermostat_accurate", label: "Thermostat accurate and responsive" },
          { id: "even_temp", label: "Even temperature throughout cabinet" },
          { id: "display_working", label: "Temperature display working (if digital)" },
          { id: "no_swings", label: "No temperature swings or cycling issues" }
        ],
        extraFields: [
          { id: "actual_temp", type: "text", label: "Actual Temp (\u00B0F)" }
        ],
        notesField: true
      },
      {
        id: "doors_gaskets",
        title: "Doors & Gaskets",
        type: "checklist",
        items: [
          { id: "doors_self_closing", label: "Doors close fully and self-closing" },
          { id: "gaskets_sealing", label: "Gaskets sealing properly (dollar bill test)" },
          { id: "gaskets_intact", label: "Gaskets intact with no tears or cracks" },
          { id: "no_ice_gasket", label: "No ice buildup on gasket" },
          { id: "hinges_tight", label: "Hinges tight and door aligned" },
          { id: "handles_secure", label: "Door handles secure" }
        ],
        notesField: true
      },
      {
        id: "compressor",
        title: "Compressor & Refrigeration",
        type: "checklist",
        items: [
          { id: "compressor_smooth", label: "Compressor running smoothly" },
          { id: "no_unusual_noise", label: "No unusual noises or vibrations" },
          { id: "refrigerant_charge", label: "Proper refrigerant charge" },
          { id: "cycling_normal", label: "Compressor cycling normally" },
          { id: "cutouts_functional", label: "High/low pressure cutouts functional" }
        ],
        extraFields: [
          { id: "compressor_amps", type: "text", label: "Compressor Amps" }
        ],
        notesField: true
      },
      {
        id: "evaporator_defrost",
        title: "Evaporator & Defrost",
        type: "checklist",
        items: [
          { id: "evap_clean", label: "Evaporator coil clean and unobstructed" },
          { id: "evap_fan", label: "Evaporator fan running properly" },
          { id: "defrost_cycle", label: "Defrost cycle functioning correctly" },
          { id: "no_excessive_frost", label: "No excessive frost buildup" },
          { id: "drain_clear", label: "Drain line clear and flowing" },
          { id: "heater_working", label: "Defrost heater working properly" }
        ],
        notesField: true
      },
      {
        id: "condenser",
        title: "Condenser System",
        type: "checklist",
        items: [
          { id: "condenser_clean", label: "Condenser coil clean" },
          { id: "condenser_fan", label: "Condenser fan operating properly" },
          { id: "adequate_airflow", label: "Adequate airflow around unit" },
          { id: "no_obstructions", label: "No obstructions blocking vents" }
        ],
        notesField: true
      },
      {
        id: "interior",
        title: "Interior Condition",
        type: "checklist",
        items: [
          { id: "interior_clean", label: "Interior clean and sanitary" },
          { id: "shelves_secure", label: "Shelves secure and level" },
          { id: "light_working", label: "Interior light working" },
          { id: "no_ice_bottom", label: "No ice buildup in bottom" }
        ],
        notesField: true
      },
      {
        id: "recommended_actions",
        title: "Recommended Actions",
        type: "checklist",
        items: [
          { id: "action_none", label: "No action needed - all items pass" },
          { id: "action_gasket", label: "Gasket replacement needed" },
          { id: "action_defrost", label: "Defrost system repair needed" },
          { id: "action_refrigeration", label: "Refrigeration service needed" },
          { id: "action_cleaning", label: "Condenser cleaning needed" },
          { id: "action_other", label: "Other (see notes)" }
        ],
        extraFields: [
          {
            id: "priority",
            type: "radio",
            label: "Priority Level",
            options: ["Low", "Medium", "High", "Critical"]
          }
        ],
        notesField: true
      }
    ]
  },

  commercial_oven: {
    name: "Commercial Oven",
    icon: "\uD83C\uDF73",
    sections: [
      {
        id: "temperature_controls",
        title: "Temperature & Controls",
        type: "checklist",
        items: [
          { id: "reaches_temp", label: "Oven reaches and maintains set temperature" },
          { id: "display_accurate", label: "Temperature display accurate" },
          { id: "thermostat_working", label: "Thermostat functioning properly" },
          { id: "timer_working", label: "Timer working correctly" },
          { id: "controls_responsive", label: "Control panel buttons responsive" }
        ],
        extraFields: [
          { id: "set_temp", type: "text", label: "Set Temp (\u00B0F)" },
          { id: "actual_temp", type: "text", label: "Actual Temp (\u00B0F)" }
        ],
        notesField: true
      },
      {
        id: "burner_element",
        title: "Burner / Element System",
        type: "checklist",
        items: [
          { id: "igniting_properly", label: "Burners/elements igniting properly" },
          { id: "flame_even", label: "Flame pattern even (gas)" },
          { id: "no_yellow_tip", label: "No yellow tipping on flame (gas)" },
          { id: "heating_uniform", label: "Elements heating uniformly (electric)" },
          { id: "no_hot_spots", label: "No hot spots or cold zones" }
        ],
        notesField: true
      },
      {
        id: "ventilation",
        title: "Ventilation & Exhaust",
        type: "checklist",
        items: [
          { id: "blower_smooth", label: "Blower/fan motor operating smoothly" },
          { id: "no_unusual_noise", label: "No unusual noises from motor" },
          { id: "venting_proper", label: "Venting properly (no backdraft)" },
          { id: "hood_drawing", label: "Vent hood drawing adequately" },
          { id: "filters_clean", label: "Filters clean and in place" }
        ],
        notesField: true
      },
      {
        id: "door_seals",
        title: "Door & Seals",
        type: "checklist",
        items: [
          { id: "door_smooth", label: "Door opens and closes smoothly" },
          { id: "gasket_intact", label: "Door gasket intact and sealing" },
          { id: "hinge_good", label: "Door hinge not loose or worn" },
          { id: "glass_clean", label: "Door glass clean and uncracked" },
          { id: "latch_secure", label: "Latch mechanism secure" }
        ],
        notesField: true
      },
      {
        id: "safety",
        title: "Safety Systems",
        type: "checklist",
        items: [
          { id: "pilot_safety", label: "Pilot safety valve functional (gas)" },
          { id: "high_limit", label: "High limit control working" },
          { id: "gas_valve_cycling", label: "Gas valve cycling properly (gas)" },
          { id: "no_gas_odors", label: "No gas odors detected (gas)" },
          { id: "circuit_protection", label: "Circuit protection adequate (electric)" }
        ],
        notesField: true
      },
      {
        id: "interior",
        title: "Interior Condition",
        type: "checklist",
        items: [
          { id: "interior_clean", label: "Interior clean and free of buildup" },
          { id: "racks_smooth", label: "Racks slide smoothly" },
          { id: "no_rust", label: "No rust or corrosion" },
          { id: "insulation_intact", label: "Insulation intact" },
          { id: "light_working", label: "Interior light working (if equipped)" }
        ],
        notesField: true
      },
      {
        id: "recommended_actions",
        title: "Recommended Actions",
        type: "checklist",
        items: [
          { id: "action_none", label: "No action needed - all items pass" },
          { id: "action_ignitor", label: "Ignitor replacement needed" },
          { id: "action_thermostat", label: "Thermostat calibration/replacement needed" },
          { id: "action_gasket", label: "Door gasket replacement needed" },
          { id: "action_safety", label: "Safety system repair needed" },
          { id: "action_cleaning", label: "Deep cleaning needed" },
          { id: "action_other", label: "Other (see notes)" }
        ],
        extraFields: [
          {
            id: "priority",
            type: "radio",
            label: "Priority Level",
            options: ["Low", "Medium", "High", "Critical"]
          }
        ],
        notesField: true
      }
    ]
  },

  commercial_fryer: {
    name: "Commercial Fryer",
    icon: "\uD83C\uDF5F",
    sections: [
      {
        id: "temperature_controls",
        title: "Temperature & Controls",
        type: "checklist",
        items: [
          { id: "reaches_temp", label: "Fryer reaches and maintains set temperature" },
          { id: "thermostat_accurate", label: "Thermostat accurate" },
          { id: "recovery_time", label: "Recovery time after load is acceptable" },
          { id: "temp_display", label: "Temperature display/indicator working" },
          { id: "controls_responsive", label: "Controls responsive and functioning" }
        ],
        extraFields: [
          { id: "set_temp", type: "text", label: "Set Temp (\u00B0F)" },
          { id: "actual_temp", type: "text", label: "Actual Temp (\u00B0F)" }
        ],
        notesField: true
      },
      {
        id: "burner_element",
        title: "Burner / Element System",
        type: "checklist",
        items: [
          { id: "ignition_proper", label: "Ignition system working properly (gas)" },
          { id: "flame_pattern", label: "Flame pattern even across burner tubes (gas)" },
          { id: "no_yellow_flame", label: "No yellow or sooty flame (gas)" },
          { id: "elements_heating", label: "Elements heating evenly (electric)" },
          { id: "no_element_damage", label: "No visible element damage (electric)" }
        ],
        notesField: true
      },
      {
        id: "oil_system",
        title: "Oil / Vat Condition",
        type: "checklist",
        items: [
          { id: "vat_no_leaks", label: "Vat free of leaks or cracks" },
          { id: "drain_valve", label: "Drain valve operates smoothly" },
          { id: "no_drain_leak", label: "No leaks at drain valve" },
          { id: "oil_level", label: "Oil level appropriate" },
          { id: "filtration_working", label: "Filtration system working (if equipped)" }
        ],
        notesField: true
      },
      {
        id: "safety",
        title: "Safety Systems",
        type: "checklist",
        items: [
          { id: "high_limit", label: "High limit safety working (450\u00B0F+)" },
          { id: "auto_shutoff", label: "Auto shutoff functional" },
          { id: "gas_safety", label: "Gas safety valve functional (gas)" },
          { id: "no_gas_odor", label: "No gas odors detected (gas)" },
          { id: "fire_suppression", label: "Fire suppression system connected (if applicable)" }
        ],
        notesField: true
      },
      {
        id: "ventilation",
        title: "Ventilation & Exhaust",
        type: "checklist",
        items: [
          { id: "hood_drawing", label: "Hood drawing properly over fryer" },
          { id: "filters_clean", label: "Hood filters clean" },
          { id: "no_grease_buildup", label: "No excessive grease buildup on unit" },
          { id: "flue_clear", label: "Flue/vent clear and unobstructed (gas)" }
        ],
        notesField: true
      },
      {
        id: "general_condition",
        title: "General Condition",
        type: "checklist",
        items: [
          { id: "exterior_clean", label: "Exterior clean and free of grease" },
          { id: "baskets_good", label: "Fry baskets in good condition" },
          { id: "no_rust", label: "No rust or corrosion" },
          { id: "level_stable", label: "Unit level and stable" },
          { id: "electrical_good", label: "Electrical connections tight and secure" }
        ],
        notesField: true
      },
      {
        id: "recommended_actions",
        title: "Recommended Actions",
        type: "checklist",
        items: [
          { id: "action_none", label: "No action needed - all items pass" },
          { id: "action_thermostat", label: "Thermostat calibration/replacement needed" },
          { id: "action_ignitor", label: "Ignitor repair needed (gas)" },
          { id: "action_element", label: "Element replacement needed (electric)" },
          { id: "action_drain", label: "Drain valve repair needed" },
          { id: "action_safety", label: "Safety system repair needed" },
          { id: "action_other", label: "Other (see notes)" }
        ],
        extraFields: [
          {
            id: "priority",
            type: "radio",
            label: "Priority Level",
            options: ["Low", "Medium", "High", "Critical"]
          }
        ],
        notesField: true
      }
    ]
  },

  dishwasher: {
    name: "Dishwasher",
    icon: "\uD83E\uDDFD",
    sections: [
      {
        id: "wash_performance",
        title: "Wash Performance",
        type: "checklist",
        items: [
          { id: "dishes_clean", label: "Dishes coming out clean" },
          { id: "wash_temp", label: "Wash temperature reaching minimum (150\u00B0F)" },
          { id: "rinse_temp", label: "Final rinse temperature correct (180\u00B0F or 140\u00B0F chemical)" },
          { id: "cycle_complete", label: "Wash cycle completing normally" },
          { id: "adequate_pressure", label: "Wash/rinse arm pressure adequate" }
        ],
        extraFields: [
          { id: "wash_temp_reading", type: "text", label: "Wash Temp (\u00B0F)" },
          { id: "rinse_temp_reading", type: "text", label: "Rinse Temp (\u00B0F)" }
        ],
        notesField: true
      },
      {
        id: "water_system",
        title: "Water System",
        type: "checklist",
        items: [
          { id: "fill_proper", label: "Tank filling to proper level" },
          { id: "drain_working", label: "Drain functioning properly" },
          { id: "no_leaks", label: "No leaks (door, tank, connections)" },
          { id: "water_inlet", label: "Water inlet valve working" },
          { id: "float_switch", label: "Float switch/level control working" }
        ],
        notesField: true
      },
      {
        id: "heating",
        title: "Heating System",
        type: "checklist",
        items: [
          { id: "tank_heater", label: "Tank heater functioning" },
          { id: "booster_heater", label: "Booster heater reaching temp (if equipped)" },
          { id: "thermostat_accurate", label: "Thermostat accurate" },
          { id: "heat_time", label: "Heating time reasonable" },
          { id: "no_mineral_buildup", label: "No excessive mineral buildup on elements" }
        ],
        notesField: true
      },
      {
        id: "chemical_system",
        title: "Chemical Dispensing",
        type: "checklist",
        items: [
          { id: "detergent_dispensing", label: "Detergent dispensing properly" },
          { id: "rinse_aid", label: "Rinse aid dispensing properly" },
          { id: "sanitizer", label: "Sanitizer dispensing properly (if chemical sanitize)" },
          { id: "chemical_levels", label: "Chemical supply levels adequate" },
          { id: "pump_working", label: "Chemical pump(s) working" }
        ],
        notesField: true
      },
      {
        id: "mechanical",
        title: "Mechanical Components",
        type: "checklist",
        items: [
          { id: "wash_arms_spin", label: "Wash arms spinning freely" },
          { id: "wash_arms_clean", label: "Wash arm nozzles clear/unblocked" },
          { id: "pump_motor", label: "Wash pump motor running smoothly" },
          { id: "door_seals", label: "Door gaskets/seals intact" },
          { id: "curtains", label: "Curtains intact (conveyor type)" },
          { id: "no_unusual_noise", label: "No unusual noises during operation" }
        ],
        notesField: true
      },
      {
        id: "general_condition",
        title: "General Condition",
        type: "checklist",
        items: [
          { id: "interior_clean", label: "Interior clean and free of debris" },
          { id: "strainer_clean", label: "Strainer/filter screens clean" },
          { id: "no_rust", label: "No rust or corrosion" },
          { id: "exterior_clean", label: "Exterior clean" },
          { id: "electrical_safe", label: "Electrical connections safe and secure" }
        ],
        notesField: true
      },
      {
        id: "recommended_actions",
        title: "Recommended Actions",
        type: "checklist",
        items: [
          { id: "action_none", label: "No action needed - all items pass" },
          { id: "action_heating", label: "Heating element/booster repair needed" },
          { id: "action_pump", label: "Wash pump service needed" },
          { id: "action_chemical", label: "Chemical system repair needed" },
          { id: "action_delime", label: "Deliming needed" },
          { id: "action_seals", label: "Door seal replacement needed" },
          { id: "action_other", label: "Other (see notes)" }
        ],
        extraFields: [
          {
            id: "priority",
            type: "radio",
            label: "Priority Level",
            options: ["Low", "Medium", "High", "Critical"]
          }
        ],
        notesField: true
      }
    ]
  },

  hvac_rooftop: {
    name: "HVAC Rooftop Unit",
    icon: "\uD83C\uDFE2",
    sections: [
      {
        id: "condenser",
        title: "Outdoor Section - Condenser",
        type: "checklist",
        items: [
          { id: "condenser_clean", label: "Condenser coil clean and unobstructed" },
          { id: "condenser_fans", label: "Condenser fan(s) operating properly" },
          { id: "fan_amps", label: "Fan motor(s) amp draw within range" },
          { id: "cabinet_sealed", label: "Cabinet panels secure and sealed" },
          { id: "no_debris", label: "No debris in unit or on roof around unit" }
        ],
        extraFields: [
          { id: "condenser_fan_amps", type: "text", label: "Condenser Fan Amps" }
        ],
        notesField: true
      },
      {
        id: "compressor",
        title: "Compressor(s)",
        type: "checklist",
        items: [
          { id: "compressor_smooth", label: "Compressor(s) running smoothly" },
          { id: "no_unusual_noise", label: "No unusual noises or vibrations" },
          { id: "compressor_amps_ok", label: "Compressor amp draw within range" },
          { id: "refrigerant_charge", label: "Proper refrigerant charge (subcooling/superheat)" },
          { id: "contactor_engaging", label: "Contactor engaging properly" }
        ],
        extraFields: [
          { id: "compressor_amps", type: "text", label: "Compressor Amps" },
          { id: "subcooling", type: "text", label: "Subcooling (\u00B0F)" },
          { id: "superheat", type: "text", label: "Superheat (\u00B0F)" }
        ],
        notesField: true
      },
      {
        id: "blower",
        title: "Blower & Air Handler",
        type: "checklist",
        items: [
          { id: "blower_smooth", label: "Blower motor operating smoothly" },
          { id: "blower_wheel_clean", label: "Blower wheel clean and balanced" },
          { id: "belt_tension", label: "Belt tension correct (if belt drive)" },
          { id: "no_vibration", label: "No excessive vibration" },
          { id: "motor_amps", label: "Motor amp draw within range" }
        ],
        extraFields: [
          { id: "blower_motor_amps", type: "text", label: "Blower Motor Amps" }
        ],
        notesField: true
      },
      {
        id: "filters_airflow",
        title: "Filters & Airflow",
        type: "checklist",
        items: [
          { id: "filters_clean", label: "Filters clean or recently changed" },
          { id: "proper_airflow", label: "Proper airflow through unit" },
          { id: "no_air_leaks", label: "No air leaks in ductwork" },
          { id: "supply_return_temps", label: "Supply/return temperatures correct" },
          { id: "static_pressure", label: "Static pressure within range" }
        ],
        extraFields: [
          { id: "supply_temp", type: "text", label: "Supply Temp (\u00B0F)" },
          { id: "return_temp", type: "text", label: "Return Temp (\u00B0F)" }
        ],
        notesField: true
      },
      {
        id: "controls",
        title: "Controls & Thermostats",
        type: "checklist",
        items: [
          { id: "thermostat_accurate", label: "Thermostat accurate and responsive" },
          { id: "control_board", label: "Control board functioning normally" },
          { id: "no_error_codes", label: "No error codes displayed" },
          { id: "economizer", label: "Economizer functioning (if equipped)" },
          { id: "safety_controls", label: "All safety controls operational" }
        ],
        notesField: true
      },
      {
        id: "electrical",
        title: "Electrical & Connections",
        type: "checklist",
        items: [
          { id: "connections_tight", label: "All electrical connections tight" },
          { id: "no_arcing", label: "No signs of arcing or burning" },
          { id: "disconnect_functional", label: "Disconnect switch functional" },
          { id: "proper_voltage", label: "Proper voltage at unit" },
          { id: "ground_secure", label: "Ground connection secure" }
        ],
        notesField: true
      },
      {
        id: "heating",
        title: "Heating Section (if equipped)",
        type: "checklist",
        items: [
          { id: "gas_igniting", label: "Gas burners igniting properly (if gas)" },
          { id: "flame_even", label: "Flame pattern even and blue (if gas)" },
          { id: "heat_strips", label: "Electric heat strips functioning (if electric)" },
          { id: "high_limit", label: "High limit switch operational" },
          { id: "no_gas_odors", label: "No gas odors detected (if gas)" }
        ],
        notesField: true
      },
      {
        id: "recommended_actions",
        title: "Recommended Actions",
        type: "checklist",
        items: [
          { id: "action_none", label: "No action needed - all items pass" },
          { id: "action_coil_clean", label: "Coil cleaning needed" },
          { id: "action_refrigerant", label: "Refrigerant charge adjustment needed" },
          { id: "action_belt", label: "Belt replacement needed" },
          { id: "action_electrical", label: "Electrical repair needed" },
          { id: "action_controls", label: "Controls/thermostat service needed" },
          { id: "action_heating", label: "Heating section repair needed" },
          { id: "action_other", label: "Other (see notes)" }
        ],
        extraFields: [
          {
            id: "priority",
            type: "radio",
            label: "Priority Level",
            options: ["Low", "Medium", "High", "Critical"]
          }
        ],
        notesField: true
      }
    ]
  },

  hvac_split: {
    name: "HVAC Split System",
    icon: "\u2744\uFE0F",
    sections: [
      {
        id: "outdoor_unit",
        title: "Outdoor Unit (Condensing Unit)",
        type: "checklist",
        items: [
          { id: "condenser_clean", label: "Condenser coil clean and unobstructed" },
          { id: "condenser_fan", label: "Condenser fan operating properly" },
          { id: "fan_amps", label: "Fan motor amp draw within range" },
          { id: "unit_level", label: "Unit level on pad/brackets" },
          { id: "clearance_adequate", label: "Adequate clearance around unit" },
          { id: "no_debris", label: "No debris or vegetation around unit" }
        ],
        extraFields: [
          { id: "condenser_fan_amps", type: "text", label: "Condenser Fan Amps" }
        ],
        notesField: true
      },
      {
        id: "compressor",
        title: "Compressor",
        type: "checklist",
        items: [
          { id: "compressor_smooth", label: "Compressor running smoothly" },
          { id: "no_unusual_noise", label: "No unusual noises or vibrations" },
          { id: "compressor_amps_ok", label: "Compressor amp draw within range" },
          { id: "refrigerant_charge", label: "Proper refrigerant charge (subcooling/superheat)" },
          { id: "contactor_engaging", label: "Contactor engaging properly" },
          { id: "capacitor_good", label: "Capacitor(s) testing within range" }
        ],
        extraFields: [
          { id: "compressor_amps", type: "text", label: "Compressor Amps" },
          { id: "subcooling", type: "text", label: "Subcooling (\u00B0F)" },
          { id: "superheat", type: "text", label: "Superheat (\u00B0F)" }
        ],
        notesField: true
      },
      {
        id: "indoor_unit",
        title: "Indoor Unit (Air Handler / Furnace)",
        type: "checklist",
        items: [
          { id: "blower_smooth", label: "Blower motor operating smoothly" },
          { id: "blower_wheel_clean", label: "Blower wheel clean" },
          { id: "evap_coil_clean", label: "Evaporator coil clean" },
          { id: "drain_pan_clear", label: "Drain pan clear and draining" },
          { id: "no_water_leaks", label: "No water leaks" },
          { id: "motor_amps", label: "Blower motor amp draw within range" }
        ],
        extraFields: [
          { id: "blower_motor_amps", type: "text", label: "Blower Motor Amps" }
        ],
        notesField: true
      },
      {
        id: "refrigerant_lines",
        title: "Refrigerant Lines",
        type: "checklist",
        items: [
          { id: "insulation_intact", label: "Suction line insulation intact" },
          { id: "no_oil_stains", label: "No oil stains at connections (leak indicator)" },
          { id: "lines_secure", label: "Lines properly secured/supported" },
          { id: "no_kinks", label: "No kinks or damage to lines" }
        ],
        notesField: true
      },
      {
        id: "filters_airflow",
        title: "Filters & Airflow",
        type: "checklist",
        items: [
          { id: "filters_clean", label: "Filters clean or recently changed" },
          { id: "proper_airflow", label: "Proper airflow through system" },
          { id: "supply_return_temps", label: "Supply/return temperatures correct" },
          { id: "no_duct_leaks", label: "No significant duct leaks" },
          { id: "registers_open", label: "All supply/return registers open" }
        ],
        extraFields: [
          { id: "supply_temp", type: "text", label: "Supply Temp (\u00B0F)" },
          { id: "return_temp", type: "text", label: "Return Temp (\u00B0F)" }
        ],
        notesField: true
      },
      {
        id: "controls",
        title: "Controls & Thermostat",
        type: "checklist",
        items: [
          { id: "thermostat_accurate", label: "Thermostat accurate and responsive" },
          { id: "control_board", label: "Control board functioning normally" },
          { id: "no_error_codes", label: "No error codes or flashing lights" },
          { id: "safety_controls", label: "All safety controls operational" }
        ],
        notesField: true
      },
      {
        id: "electrical",
        title: "Electrical & Connections",
        type: "checklist",
        items: [
          { id: "connections_tight", label: "All electrical connections tight" },
          { id: "no_arcing", label: "No signs of arcing or burning" },
          { id: "disconnect_functional", label: "Disconnect switch functional" },
          { id: "proper_voltage", label: "Proper voltage at unit" },
          { id: "ground_secure", label: "Ground connection secure" }
        ],
        notesField: true
      },
      {
        id: "recommended_actions",
        title: "Recommended Actions",
        type: "checklist",
        items: [
          { id: "action_none", label: "No action needed - all items pass" },
          { id: "action_coil_clean", label: "Coil cleaning needed" },
          { id: "action_refrigerant", label: "Refrigerant charge adjustment needed" },
          { id: "action_capacitor", label: "Capacitor replacement needed" },
          { id: "action_drain", label: "Drain line clearing needed" },
          { id: "action_electrical", label: "Electrical repair needed" },
          { id: "action_controls", label: "Controls/thermostat service needed" },
          { id: "action_other", label: "Other (see notes)" }
        ],
        extraFields: [
          {
            id: "priority",
            type: "radio",
            label: "Priority Level",
            options: ["Low", "Medium", "High", "Critical"]
          }
        ],
        notesField: true
      }
    ]
  },

  // ============================================
  // BAKERY EQUIPMENT
  // ============================================

  rotating_rack_oven: {
    name: "Rotating Rack Oven",
    icon: "\uD83C\uDF5E",
    sections: [
      {
        id: "exterior_structure",
        title: "Exterior / Structure",
        type: "checklist",
        items: [
          { id: "panels_condition", label: "Exterior panels free of dents, corrosion, or damage" },
          { id: "insulation_intact", label: "Insulation intact (no hot spots on exterior)" },
          { id: "door_aligned", label: "Door aligned and closing flush" },
          { id: "door_gasket", label: "Door gasket intact, no cracks or hardening" },
          { id: "door_hinges", label: "Door hinges tight and properly lubricated" },
          { id: "door_latch", label: "Door latch engages securely" },
          { id: "glass_window", label: "Viewing window clean and uncracked (if equipped)" },
          { id: "legs_casters", label: "Legs/casters stable and level" },
          { id: "data_plate", label: "Data plate legible" }
        ],
        notesField: true
      },
      {
        id: "gas_system",
        title: "Gas Supply & Burner System",
        type: "checklist",
        items: [
          { id: "gas_shutoff", label: "Manual gas shutoff valve accessible and functional" },
          { id: "gas_connections", label: "Gas connections tight, no leaks (soap bubble test)" },
          { id: "gas_pressure", label: "Gas pressure at inlet within spec" },
          { id: "sediment_trap", label: "Sediment trap (drip leg) installed" },
          { id: "ignition_reliable", label: "Ignition system lighting reliably" },
          { id: "flame_sensor", label: "Flame sensor/thermocouple clean and aligned" },
          { id: "flame_pattern", label: "Burner flame even, blue, no yellow tips" },
          { id: "burner_ports", label: "Burner tubes/ports clear of blockage or corrosion" },
          { id: "safety_valve", label: "Safety shutoff valve(s) tested for seat leakage" },
          { id: "heat_exchanger", label: "Heat exchanger free of cracks, soot, or corrosion" }
        ],
        extraFields: [
          { id: "inlet_pressure", type: "text", label: "Inlet Gas Pressure (in. W.C.)" },
          { id: "manifold_pressure", type: "text", label: "Manifold Pressure (in. W.C.)" },
          { id: "flame_sensor_ua", type: "text", label: "Flame Sensor Reading (\u00B5A)" }
        ],
        notesField: true
      },
      {
        id: "rack_drive",
        title: "Rack Rotation / Drive System",
        type: "checklist",
        items: [
          { id: "rotation_smooth", label: "Rack rotates smoothly without jerking or stopping" },
          { id: "drive_motor", label: "Drive motor running without unusual noise or vibration" },
          { id: "drive_belt", label: "Drive belt/chain proper tension, no cracks or fraying" },
          { id: "drive_coupling", label: "Drive coupling not worn or stripped" },
          { id: "bearings_lubed", label: "Bearings and pivot points lubricated" },
          { id: "rack_hook", label: "Rack engagement hook/lift mechanism not worn" },
          { id: "limit_switch", label: "Limit switch(es) operating correctly" },
          { id: "turntable", label: "Turntable plate free of warping or debris" }
        ],
        extraFields: [
          { id: "drive_motor_amps", type: "text", label: "Drive Motor Amps" },
          { id: "belt_deflection", type: "text", label: "Belt Deflection (inches)" }
        ],
        notesField: true
      },
      {
        id: "steam_system",
        title: "Steam / Humidity System",
        type: "checklist",
        items: [
          { id: "vaporizer_scale", label: "Vaporizer/water injection free of scale buildup" },
          { id: "steam_solenoid", label: "Steam solenoid valve opens/closes on command" },
          { id: "water_supply", label: "Water supply line and connections leak-free" },
          { id: "water_strainer", label: "Water inlet strainer/filter not blocked" },
          { id: "steam_delivery", label: "Steam delivery even and adequate" },
          { id: "vent_damper", label: "Steam vent/damper opens and closes freely" },
          { id: "drain_clear", label: "Drain line clear, no clogs or leaks" }
        ],
        notesField: true
      },
      {
        id: "ventilation",
        title: "Ventilation & Airflow",
        type: "checklist",
        items: [
          { id: "fan_blades", label: "Circulation fan blades clean, no damage or imbalance" },
          { id: "fan_bearings", label: "Fan motor bearings quiet, no roughness" },
          { id: "air_baffles", label: "Air baffles and ductwork free of blockage" },
          { id: "exhaust_damper", label: "Exhaust damper operates freely" },
          { id: "exhaust_fan", label: "Exhaust fan and airflow proving switch functional" },
          { id: "flue_clear", label: "Flue/exhaust path clear with proper draft" },
          { id: "barometric_damper", label: "Barometric damper operating correctly" }
        ],
        extraFields: [
          { id: "circ_fan_amps", type: "text", label: "Circulation Fan Motor Amps" },
          { id: "stack_temp", type: "text", label: "Stack/Flue Temperature (\u00B0F)" }
        ],
        notesField: true
      },
      {
        id: "controls_electrical",
        title: "Controls & Electrical",
        type: "checklist",
        items: [
          { id: "temp_accuracy", label: "Oven temperature accurate (verified with independent probe)" },
          { id: "all_controls", label: "All controls functional (temp, timer, steam, rotation)" },
          { id: "display_legible", label: "Digital display functioning and legible" },
          { id: "indicator_lights", label: "Indicator lights and alarms working" },
          { id: "wiring_connections", label: "Wiring and terminal connections secure, no heat damage" },
          { id: "contactors", label: "Contactors clean, no pitting or carbon buildup" },
          { id: "programs", label: "Programmable controller settings correct" }
        ],
        extraFields: [
          { id: "set_temp", type: "text", label: "Set Temperature (\u00B0F)" },
          { id: "actual_temp", type: "text", label: "Actual Temperature (\u00B0F)" },
          { id: "supply_voltage", type: "text", label: "Supply Voltage (V)" }
        ],
        notesField: true
      },
      {
        id: "safety",
        title: "Safety Systems",
        type: "checklist",
        items: [
          { id: "high_limit", label: "High-temperature limit safety shuts off burner properly" },
          { id: "door_interlock", label: "Door interlock stops operation when door opens" },
          { id: "gas_shutoff_accessible", label: "Emergency gas shutoff accessible and labeled" },
          { id: "flame_failure", label: "Flame failure response shuts down within 4 seconds" },
          { id: "safety_labels", label: "All safety labels and warnings legible" },
          { id: "clearance_combustibles", label: "Proper clearance to combustibles maintained" },
          { id: "no_gas_odor", label: "No gas odor around oven or connections" },
          { id: "osha_current", label: "OSHA 29 CFR 1910.263 safety device inspection current" }
        ],
        extraFields: [
          { id: "high_limit_trip", type: "text", label: "High Limit Trip Point (\u00B0F)" }
        ],
        notesField: true
      },
      {
        id: "recommended_actions",
        title: "Recommended Actions",
        type: "checklist",
        items: [
          { id: "action_none", label: "No action needed - all items pass" },
          { id: "action_burner", label: "Burner/ignition system service needed" },
          { id: "action_drive", label: "Drive system repair needed" },
          { id: "action_steam", label: "Steam/humidity system service needed" },
          { id: "action_gasket", label: "Door gasket replacement needed" },
          { id: "action_controls", label: "Controls/thermostat calibration needed" },
          { id: "action_safety", label: "Safety device repair needed" },
          { id: "action_other", label: "Other (see notes)" }
        ],
        extraFields: [
          {
            id: "priority",
            type: "radio",
            label: "Priority Level",
            options: ["Low", "Medium", "High", "Critical"]
          }
        ],
        notesField: true
      }
    ]
  },

  proofer: {
    name: "Proofer",
    icon: "\uD83E\uDD50",
    sections: [
      {
        id: "cabinet_structure",
        title: "Cabinet / Structure",
        type: "checklist",
        items: [
          { id: "panels_condition", label: "Exterior panels free of dents, corrosion, or delamination" },
          { id: "insulation_intact", label: "Insulation intact (no hot/cold spots)" },
          { id: "base_stable", label: "Base, legs, or casters stable; locking casters engage" },
          { id: "cabinet_level", label: "Cabinet level (critical for drainage and humidity)" },
          { id: "fasteners", label: "Fasteners and hardware free of corrosion" },
          { id: "mold_exterior", label: "No mold or mildew on exterior surfaces" },
          { id: "data_plate", label: "Data plate legible" }
        ],
        notesField: true
      },
      {
        id: "door_seals",
        title: "Door & Seals",
        type: "checklist",
        items: [
          { id: "gasket_intact", label: "Door gasket free of tears, compression set, or hardening" },
          { id: "gasket_sealing", label: "Gasket seals tightly around full perimeter" },
          { id: "hinges_lubed", label: "Door hinges lubricated with food-safe lubricant" },
          { id: "latch_engages", label: "Door latch engages positively" },
          { id: "door_no_warp", label: "Door not warped or misaligned" },
          { id: "door_glass", label: "Door glass uncracked, no condensation between panes (if equipped)" },
          { id: "magnetic_catch", label: "Magnetic catch/door closer operates properly" }
        ],
        notesField: true
      },
      {
        id: "heating_system",
        title: "Heating System",
        type: "checklist",
        items: [
          { id: "elements_condition", label: "Heating element(s) free of corrosion or scale" },
          { id: "contactor_relay", label: "Heating contactor/relay engages properly" },
          { id: "temp_accuracy", label: "Temperature holds within +/- 3\u00B0F of setpoint" },
          { id: "temp_sensor", label: "Temperature sensor/probe undamaged, no corrosion" },
          { id: "wiring_intact", label: "Wiring to elements free of heat damage or moisture" }
        ],
        extraFields: [
          { id: "set_temp", type: "text", label: "Set Temperature (\u00B0F)" },
          { id: "actual_temp", type: "text", label: "Actual Temperature (\u00B0F)" },
          { id: "element_resistance", type: "text", label: "Element Resistance (\u03A9)" }
        ],
        notesField: true
      },
      {
        id: "humidity_system",
        title: "Humidity / Steam System",
        type: "checklist",
        items: [
          { id: "humidity_accurate", label: "Humidity level accurate (verified with hygrometer)" },
          { id: "humidity_sensor", label: "Humidity sensor/probe free of scale or damage" },
          { id: "water_solenoid", label: "Water supply solenoid opens/closes cleanly, no drip" },
          { id: "solenoid_scale", label: "Solenoid free of calcium/mineral buildup" },
          { id: "water_line", label: "Water supply line and connections leak-free" },
          { id: "water_filter", label: "Water inlet screen/filter not blocked" },
          { id: "steam_gen_scale", label: "Steam generator/water pan free of scale" },
          { id: "distribution", label: "Water distribution trough/nozzles not clogged" },
          { id: "condensate_drain", label: "Condensate drain line clear, proper slope" },
          { id: "drain_pan", label: "Drain pan clear and draining freely" },
          { id: "no_pooling", label: "No excessive condensation pooling inside cabinet" }
        ],
        extraFields: [
          { id: "set_humidity", type: "text", label: "Set Humidity (%RH)" },
          { id: "actual_humidity", type: "text", label: "Actual Humidity (%RH)" }
        ],
        notesField: true
      },
      {
        id: "air_circulation",
        title: "Air Circulation",
        type: "checklist",
        items: [
          { id: "fan_blades_clean", label: "Circulation fan blades free of buildup or damage" },
          { id: "fan_motor", label: "Fan motor no unusual noise or vibration" },
          { id: "airflow_uniform", label: "Airflow uniform throughout cabinet (top, middle, bottom)" },
          { id: "baffles_clear", label: "Air baffles and ducting free of blockage" },
          { id: "vent_openings", label: "Ventilation openings and grilles clean" },
          { id: "fan_wiring", label: "Fan motor wiring free of moisture damage" }
        ],
        extraFields: [
          { id: "fan_motor_amps", type: "text", label: "Fan Motor Amps" }
        ],
        notesField: true
      },
      {
        id: "interior_condition",
        title: "Interior Condition",
        type: "checklist",
        items: [
          { id: "interior_surfaces", label: "Interior walls, ceiling, floor free of corrosion or pitting" },
          { id: "rack_slides", label: "Rack slides/supports secure, level, undamaged" },
          { id: "no_mold", label: "No mold or mildew growth on interior" },
          { id: "interior_drain", label: "Interior drain clear and unobstructed" },
          { id: "interior_light", label: "Interior light functional with sealed fixture (if equipped)" },
          { id: "sealant", label: "Interior silicone sealant intact around joints" }
        ],
        notesField: true
      },
      {
        id: "controls_electrical",
        title: "Controls & Electrical",
        type: "checklist",
        items: [
          { id: "all_controls", label: "All controls functional (temp, humidity, timer, fan)" },
          { id: "display_legible", label: "Digital display functioning and legible" },
          { id: "panel_moisture", label: "Control panel free of moisture intrusion" },
          { id: "indicator_lights", label: "Indicator lights and alarms working" },
          { id: "wiring_junction", label: "Wiring in junction box free of corrosion" },
          { id: "high_limit", label: "High-temperature safety limit functional" },
          { id: "gfci", label: "GFCI protection in place and functional" },
          { id: "ground_intact", label: "Proper grounding intact" },
          { id: "power_cord", label: "Power cord and plug undamaged" }
        ],
        extraFields: [
          { id: "supply_voltage", type: "text", label: "Supply Voltage (V)" }
        ],
        notesField: true
      },
      {
        id: "recommended_actions",
        title: "Recommended Actions",
        type: "checklist",
        items: [
          { id: "action_none", label: "No action needed - all items pass" },
          { id: "action_gasket", label: "Door gasket replacement needed" },
          { id: "action_heating", label: "Heating element service needed" },
          { id: "action_humidity", label: "Humidity/steam system service needed" },
          { id: "action_descale", label: "Descaling needed" },
          { id: "action_fan", label: "Fan motor repair needed" },
          { id: "action_drain", label: "Drain system service needed" },
          { id: "action_electrical", label: "Electrical repair needed" },
          { id: "action_other", label: "Other (see notes)" }
        ],
        extraFields: [
          {
            id: "priority",
            type: "radio",
            label: "Priority Level",
            options: ["Low", "Medium", "High", "Critical"]
          }
        ],
        notesField: true
      }
    ]
  },

  pizza_oven: {
    name: "Pizza Oven",
    icon: "\uD83C\uDF55",
    sections: [
      {
        id: "exterior_cabinet",
        title: "Exterior / Cabinet",
        type: "checklist",
        items: [
          { id: "panels_condition", label: "Exterior panels free of dents, corrosion, or grease buildup" },
          { id: "base_stable", label: "Base, legs, or stacking kit stable and level" },
          { id: "service_panels", label: "Service access panels fit properly" },
          { id: "ventilation_clear", label: "Ventilation openings and louvers clear" },
          { id: "door_condition", label: "Door(s) not warped, sagging, or misaligned" },
          { id: "door_gasket", label: "Door gasket/seal intact (deck ovens)" },
          { id: "door_counterbalance", label: "Door counterbalance holds in any position (deck ovens)" },
          { id: "data_plate", label: "Data plate legible" }
        ],
        notesField: true
      },
      {
        id: "heating_system",
        title: "Heating System",
        type: "checklist",
        items: [
          { id: "ignition_system", label: "Ignition system working properly (gas)" },
          { id: "flame_sensor", label: "Flame sensor(s) clean and aligned (gas)" },
          { id: "flame_pattern", label: "Burner flame even, blue, stable (gas)" },
          { id: "burner_tubes", label: "Burner tubes free of blockage or corrosion (gas)" },
          { id: "gas_connections", label: "Gas connections tight, no leaks (gas)" },
          { id: "safety_valve", label: "Safety shutoff valve tested (gas)" },
          { id: "elements_condition", label: "Heating elements undamaged, no warping (electric)" },
          { id: "element_connections", label: "Element terminal connections secure (electric)" },
          { id: "contactors", label: "Contactors/relays engaging properly" },
          { id: "heat_baffles", label: "Heat baffles properly positioned (deck ovens)" }
        ],
        extraFields: [
          { id: "gas_pressure_inlet", type: "text", label: "Gas Pressure - Inlet (in. W.C.)" },
          { id: "gas_pressure_manifold", type: "text", label: "Gas Pressure - Manifold (in. W.C.)" },
          { id: "flame_sensor_ua", type: "text", label: "Flame Sensor Reading (\u00B5A)" }
        ],
        notesField: true
      },
      {
        id: "deck_surface",
        title: "Deck / Baking Surface",
        type: "checklist",
        items: [
          { id: "stones_intact", label: "Deck stones/baking surface free of cracks or chips" },
          { id: "stones_level", label: "No uneven surfaces or stone shifting" },
          { id: "stones_clean", label: "Deck clean, free of carbonized debris" },
          { id: "temp_uniform", label: "Temperature uniform across deck surface" },
          { id: "stone_support", label: "Deck stone support/cradle undamaged" },
          { id: "stone_edges", label: "Stone edges not crumbling (thermal shock damage)" }
        ],
        extraFields: [
          { id: "deck_temp_left", type: "text", label: "Deck Temp - Left (\u00B0F)" },
          { id: "deck_temp_center", type: "text", label: "Deck Temp - Center (\u00B0F)" },
          { id: "deck_temp_right", type: "text", label: "Deck Temp - Right (\u00B0F)" }
        ],
        notesField: true
      },
      {
        id: "conveyor_system",
        title: "Conveyor System (Conveyor Ovens)",
        type: "checklist",
        items: [
          { id: "belt_condition", label: "Conveyor belt free of damage, warping, broken links" },
          { id: "belt_tension", label: "Belt tension correct (1/4\" lift at opening)" },
          { id: "belt_tracking", label: "Belt tracks centered, no rubbing on sides" },
          { id: "drive_motor", label: "Conveyor drive motor running smoothly" },
          { id: "drive_chain", label: "Drive chain proper tension and lubrication" },
          { id: "drive_sprockets", label: "Drive sprockets free of wear or tooth damage" },
          { id: "motor_brushes", label: "Motor brushes adequate (if DC motor)" },
          { id: "belt_speed", label: "Belt speed/cook time accurate" },
          { id: "entry_exit_guards", label: "Belt entry and exit guards/fingers undamaged" }
        ],
        extraFields: [
          { id: "conveyor_motor_amps", type: "text", label: "Conveyor Motor Amps" },
          { id: "cook_time", type: "text", label: "Cook Time / Belt Speed (min)" }
        ],
        notesField: true
      },
      {
        id: "impingement_system",
        title: "Air Impingement (Conveyor Ovens)",
        type: "checklist",
        items: [
          { id: "air_fingers", label: "Air fingers inspected, positions noted for reinstallation" },
          { id: "fingers_clean", label: "Air finger openings clean, free of grease/carbon" },
          { id: "fingers_condition", label: "Air fingers free of warping or cracking" },
          { id: "blank_plates", label: "Blank plates in correct positions" },
          { id: "blower_motor", label: "Blower motor(s) running smoothly" },
          { id: "blower_belt", label: "Blower belt tension correct (1/4\" deflection)" },
          { id: "blower_belt_condition", label: "Blower belt free of cracking, fraying, glazing" },
          { id: "blower_wheel", label: "Blower wheel and housing clean" },
          { id: "motor_compartment", label: "Motor compartment and vents cleaned out" }
        ],
        extraFields: [
          { id: "blower_motor_amps", type: "text", label: "Blower Motor Amps" }
        ],
        notesField: true
      },
      {
        id: "controls_electrical",
        title: "Controls & Electrical",
        type: "checklist",
        items: [
          { id: "temp_accuracy", label: "Oven temperature accurate per deck/zone" },
          { id: "all_controls", label: "All controls functional (temp, speed, heat balance)" },
          { id: "display_legible", label: "Digital display(s) functioning and legible" },
          { id: "wiring_connections", label: "Wiring and connections secure in electrical compartment" },
          { id: "contactors_clean", label: "Contactors and relays free of pitting" },
          { id: "recipe_settings", label: "Programmable recipe settings correct" }
        ],
        extraFields: [
          { id: "set_temp", type: "text", label: "Set Temperature (\u00B0F)" },
          { id: "actual_temp", type: "text", label: "Actual Temperature (\u00B0F)" },
          { id: "supply_voltage", type: "text", label: "Supply Voltage (V)" }
        ],
        notesField: true
      },
      {
        id: "safety",
        title: "Safety Systems",
        type: "checklist",
        items: [
          { id: "high_limit", label: "High-temperature limit safety functional per zone" },
          { id: "flame_failure", label: "Flame failure shuts down within 4 seconds (gas)" },
          { id: "gas_shutoff", label: "Emergency gas shutoff accessible and functional" },
          { id: "airflow_interlock", label: "Airflow proving prevents ignition without airflow (NFPA 86)" },
          { id: "conveyor_interlock", label: "Conveyor stall interlock functional (if equipped)" },
          { id: "safety_labels", label: "All safety/burn-hazard labels legible" },
          { id: "clearance", label: "Proper clearance to combustibles maintained" },
          { id: "no_gas_odor", label: "No gas odor around oven" }
        ],
        extraFields: [
          { id: "high_limit_trip", type: "text", label: "High Limit Trip Point (\u00B0F)" }
        ],
        notesField: true
      },
      {
        id: "recommended_actions",
        title: "Recommended Actions",
        type: "checklist",
        items: [
          { id: "action_none", label: "No action needed - all items pass" },
          { id: "action_burner", label: "Burner/ignition service needed" },
          { id: "action_stones", label: "Deck stone repair/replacement needed" },
          { id: "action_conveyor", label: "Conveyor belt/drive service needed" },
          { id: "action_impingement", label: "Air finger/blower service needed" },
          { id: "action_controls", label: "Controls calibration needed" },
          { id: "action_safety", label: "Safety device repair needed" },
          { id: "action_other", label: "Other (see notes)" }
        ],
        extraFields: [
          {
            id: "priority",
            type: "radio",
            label: "Priority Level",
            options: ["Low", "Medium", "High", "Critical"]
          },
          {
            id: "oven_type",
            type: "radio",
            label: "Oven Type",
            options: ["Gas Deck", "Electric Deck", "Gas Conveyor", "Electric Conveyor"]
          }
        ],
        notesField: true
      }
    ]
  },

  // ============================================
  // HOT HOLDING & SERVING EQUIPMENT
  // ============================================

  heated_holding_cabinet: {
    name: "Heated Holding Cabinet",
    icon: "\uD83D\uDD25",
    sections: [
      {
        id: "temp_controls",
        title: "Temperature & Controls",
        type: "checklist",
        items: [
          { id: "reaches_temp", label: "Cabinet reaches and maintains set temperature (140-200\u00B0F)" },
          { id: "thermostat_accurate", label: "Thermostat calibrated and accurate" },
          { id: "temp_display", label: "Temperature display/indicator working" },
          { id: "even_temp", label: "Even heat distribution throughout cabinet" },
          { id: "temp_recovery", label: "Temperature recovery acceptable after door opening" },
          { id: "control_knob", label: "Control knob/dial responsive and not loose" },
          { id: "digital_controls", label: "Digital controls responsive (if equipped)" }
        ],
        extraFields: [
          { id: "set_temp", type: "text", label: "Set Temperature (\u00B0F)" },
          { id: "top_shelf_temp", type: "text", label: "Top Shelf Temp (\u00B0F)" },
          { id: "bottom_shelf_temp", type: "text", label: "Bottom Shelf Temp (\u00B0F)" }
        ],
        notesField: true
      },
      {
        id: "heating_elements",
        title: "Heating Elements & System",
        type: "checklist",
        items: [
          { id: "elements_functioning", label: "All heating elements functioning" },
          { id: "elements_intact", label: "No visible damage or corrosion on elements" },
          { id: "no_hot_spots", label: "No hot spots or uneven heating" },
          { id: "element_mounting", label: "Element mounting brackets secure" },
          { id: "thermobulb", label: "Thermostat sensing bulb intact and positioned correctly" },
          { id: "humidity_system", label: "Humidity/moisture system functioning (if equipped)" },
          { id: "water_pan", label: "Water pan present and filling properly (if equipped)" }
        ],
        notesField: true
      },
      {
        id: "doors_gaskets",
        title: "Doors & Gaskets",
        type: "checklist",
        items: [
          { id: "door_closes", label: "Door(s) close fully and latch securely" },
          { id: "door_aligned", label: "Door properly aligned in frame" },
          { id: "gasket_intact", label: "Door gasket intact around full perimeter" },
          { id: "gasket_sealing", label: "Gasket sealing properly (no heat escaping)" },
          { id: "gasket_no_cracks", label: "Gasket not cracked, hardened, or compressed flat" },
          { id: "hinges_tight", label: "Door hinges tight and not worn" },
          { id: "door_handle", label: "Door handle secure and functional" },
          { id: "glass_clean", label: "Door glass clean and uncracked (if glass door)" }
        ],
        notesField: true
      },
      {
        id: "interior",
        title: "Interior Condition",
        type: "checklist",
        items: [
          { id: "interior_clean", label: "Interior clean and free of food debris" },
          { id: "slide_rails", label: "Slide rails/tray supports secure and undamaged" },
          { id: "slides_smooth", label: "Pan slides move freely without binding" },
          { id: "shelves_level", label: "Shelves/racks level and properly seated" },
          { id: "no_rust", label: "No rust, corrosion, or pitting on interior" },
          { id: "insulation_intact", label: "Cabinet insulation intact" },
          { id: "interior_light", label: "Interior light functioning (if equipped)" }
        ],
        notesField: true
      },
      {
        id: "electrical",
        title: "Electrical System",
        type: "checklist",
        items: [
          { id: "power_cord", label: "Power cord intact, no fraying or damage" },
          { id: "plug_condition", label: "Plug prongs straight, not burned or pitted" },
          { id: "connections_tight", label: "Internal wire connections tight and secure" },
          { id: "no_arcing", label: "No signs of arcing, burning, or melted insulation" },
          { id: "ground_intact", label: "Ground connection intact" },
          { id: "proper_voltage", label: "Voltage at unit within spec" }
        ],
        extraFields: [
          { id: "voltage", type: "text", label: "Voltage Reading (V)" },
          { id: "amp_draw", type: "text", label: "Amp Draw (A)" }
        ],
        notesField: true
      },
      {
        id: "mobility_exterior",
        title: "Mobility & Exterior",
        type: "checklist",
        items: [
          { id: "casters_rolling", label: "All casters rolling freely" },
          { id: "casters_locking", label: "Locking casters engaging and holding" },
          { id: "caster_bolts", label: "Caster mounting bolts tight" },
          { id: "exterior_clean", label: "Exterior surfaces clean and undamaged" },
          { id: "no_dents", label: "No dents or panel damage affecting insulation" },
          { id: "safety_labels", label: "Hot surface warning labels present" }
        ],
        notesField: true
      },
      {
        id: "recommended_actions",
        title: "Recommended Actions",
        type: "checklist",
        items: [
          { id: "action_none", label: "No action needed - all items pass" },
          { id: "action_gasket", label: "Gasket replacement needed" },
          { id: "action_element", label: "Heating element repair/replacement needed" },
          { id: "action_thermostat", label: "Thermostat calibration/replacement needed" },
          { id: "action_casters", label: "Caster replacement needed" },
          { id: "action_door", label: "Door/hinge repair needed" },
          { id: "action_electrical", label: "Electrical repair needed" },
          { id: "action_other", label: "Other (see notes)" }
        ],
        extraFields: [
          {
            id: "priority",
            type: "radio",
            label: "Priority Level",
            options: ["Low", "Medium", "High", "Critical"]
          }
        ],
        notesField: true
      }
    ]
  },

  steam_table: {
    name: "Steam Table / Hot Table",
    icon: "\u2668\uFE0F",
    sections: [
      {
        id: "temp_controls",
        title: "Temperature & Controls",
        type: "checklist",
        items: [
          { id: "reaches_temp", label: "Unit reaches and maintains serving temperature (140\u00B0F+ all wells)" },
          { id: "thermostat_accurate", label: "Thermostat calibrated and accurate" },
          { id: "thermostat_cycling", label: "Thermostat cycling on/off appropriately" },
          { id: "control_knob", label: "Control knob/dial responsive and properly marked" },
          { id: "individual_controls", label: "Individual well controls functioning (if equipped)" }
        ],
        extraFields: [
          { id: "well1_temp", type: "text", label: "Well 1 Temp (\u00B0F)" },
          { id: "well2_temp", type: "text", label: "Well 2 Temp (\u00B0F)" },
          { id: "well3_temp", type: "text", label: "Well 3 Temp (\u00B0F)" },
          { id: "well4_temp", type: "text", label: "Well 4 Temp (\u00B0F)" }
        ],
        notesField: true
      },
      {
        id: "water_system",
        title: "Water System (Wet Heat)",
        type: "checklist",
        items: [
          { id: "water_level", label: "Water level adequate in wells during operation" },
          { id: "low_water_cutoff", label: "Low-water cutoff safety engaging (if equipped)" },
          { id: "fill_valve", label: "Auto-fill valve functioning (if equipped)" },
          { id: "drain_valve", label: "Drain valve(s) open and close smoothly" },
          { id: "no_drain_leaks", label: "No leaks at drain valve(s)" },
          { id: "no_well_leaks", label: "No leaks from wells or seams" },
          { id: "descaled", label: "Wells and probes free of scale/mineral buildup" }
        ],
        notesField: true
      },
      {
        id: "heating_elements",
        title: "Heating Elements / Burners",
        type: "checklist",
        items: [
          { id: "elements_functioning", label: "All heating elements/burners functioning" },
          { id: "elements_no_damage", label: "No visible damage or corrosion on elements" },
          { id: "no_scale_elements", label: "No excessive calcium/lime buildup on elements" },
          { id: "even_heating", label: "Heat distributed evenly across all wells" },
          { id: "gas_ignition", label: "Ignition system working (gas units)" },
          { id: "flame_pattern", label: "Flame pattern even and blue (gas units)" },
          { id: "gas_valve", label: "Gas valve cycling properly (gas units)" },
          { id: "no_gas_odor", label: "No gas odors detected (gas units)" }
        ],
        extraFields: [
          {
            id: "unit_type",
            type: "radio",
            label: "Unit Type",
            options: ["Electric", "Gas"]
          }
        ],
        notesField: true
      },
      {
        id: "wells_pans",
        title: "Wells & Service Area",
        type: "checklist",
        items: [
          { id: "wells_clean", label: "All wells clean and free of residue" },
          { id: "well_surface", label: "Well surfaces smooth, no pitting or corrosion" },
          { id: "no_cracks", label: "No cracks or weld failures on wells" },
          { id: "adaptor_plates", label: "Adaptor plates/rings fit properly (if equipped)" },
          { id: "sneeze_guard", label: "Sneeze guard/food shield secure and clean (if equipped)" },
          { id: "cutting_board", label: "Cutting board/work surface in good condition (if equipped)" }
        ],
        notesField: true
      },
      {
        id: "electrical",
        title: "Electrical System",
        type: "checklist",
        items: [
          { id: "power_cord", label: "Power cord intact, no fraying or damage" },
          { id: "connections_tight", label: "Internal wire connections tight and secure" },
          { id: "no_arcing", label: "No signs of arcing or melted insulation" },
          { id: "ground_intact", label: "Ground connection intact" },
          { id: "proper_voltage", label: "Voltage at unit within spec" },
          { id: "no_moisture", label: "No moisture in electrical compartment" }
        ],
        extraFields: [
          { id: "voltage", type: "text", label: "Voltage Reading (V)" },
          { id: "amp_draw", type: "text", label: "Amp Draw (A)" }
        ],
        notesField: true
      },
      {
        id: "structure_safety",
        title: "Structure & Safety",
        type: "checklist",
        items: [
          { id: "legs_stable", label: "Legs/base sturdy and level" },
          { id: "casters_working", label: "Casters rolling freely and locking (if mobile)" },
          { id: "no_sharp_edges", label: "No sharp edges or exposed metal burrs" },
          { id: "exterior_clean", label: "Exterior surfaces clean and undamaged" },
          { id: "hot_surface_labels", label: "Hot surface warning labels present" },
          { id: "no_exposed_wiring", label: "No exposed wiring accessible to users" }
        ],
        notesField: true
      },
      {
        id: "recommended_actions",
        title: "Recommended Actions",
        type: "checklist",
        items: [
          { id: "action_none", label: "No action needed - all items pass" },
          { id: "action_element", label: "Heating element replacement needed" },
          { id: "action_thermostat", label: "Thermostat calibration/replacement needed" },
          { id: "action_drain", label: "Drain valve repair/replacement needed" },
          { id: "action_descale", label: "Descaling/deliming needed" },
          { id: "action_gas", label: "Gas system service needed" },
          { id: "action_electrical", label: "Electrical repair needed" },
          { id: "action_well", label: "Well repair/welding needed" },
          { id: "action_other", label: "Other (see notes)" }
        ],
        extraFields: [
          {
            id: "priority",
            type: "radio",
            label: "Priority Level",
            options: ["Low", "Medium", "High", "Critical"]
          }
        ],
        notesField: true
      }
    ]
  },

  combi_oven: {
    name: "Combi Oven",
    icon: "\u2601\uFE0F",
    sections: [
      {
        id: "exterior_cabinet",
        title: "Exterior / Cabinet",
        type: "checklist",
        items: [
          { id: "panels_condition", label: "Exterior panels free of dents or corrosion" },
          { id: "mounting_stable", label: "Wall mount/stand/legs stable and level" },
          { id: "service_panels", label: "Service access panels secure" },
          { id: "ventilation_clear", label: "Ventilation openings clear" },
          { id: "exhaust_connection", label: "Exhaust/condensation hood properly sealed" },
          { id: "power_cord", label: "Power cord and plug undamaged" },
          { id: "data_plate", label: "Data plate legible" }
        ],
        notesField: true
      },
      {
        id: "door_seals",
        title: "Door & Seals",
        type: "checklist",
        items: [
          { id: "gasket_intact", label: "Door gasket free of cracks, tears, or grease buildup" },
          { id: "gasket_sealing", label: "Gasket seals fully, no steam leaks" },
          { id: "hinges_tight", label: "Door hinges tight, door swings freely" },
          { id: "latch_engages", label: "Door latch engages positively" },
          { id: "glass_condition", label: "Glass pane(s) uncracked, no hazing or seal failure" },
          { id: "door_interlock", label: "Door interlock stops heating/steam when door opens" },
          { id: "drip_tray", label: "Door drip tray channel drains freely" },
          { id: "probe_port", label: "Core temperature probe port seal intact" }
        ],
        notesField: true
      },
      {
        id: "steam_boiler",
        title: "Steam / Boiler System",
        type: "checklist",
        items: [
          { id: "boiler_scale", label: "Boiler/steam generator free of scale buildup" },
          { id: "descale_current", label: "Descaling performed on schedule" },
          { id: "boiler_elements", label: "Boiler elements free of scale, pitting, damage" },
          { id: "level_probe", label: "Boiler level probe clean and detecting water accurately" },
          { id: "fill_solenoid", label: "Water fill solenoid opens/closes cleanly" },
          { id: "fill_level", label: "Boiler fills to correct level, no overfill" },
          { id: "drain_valve", label: "Boiler drain valve operates properly" },
          { id: "flush_cycle", label: "Flush cycle working (water visible in drain)" },
          { id: "steam_nozzles", label: "Steam injection nozzles/ports unblocked" }
        ],
        extraFields: [
          { id: "last_descale", type: "text", label: "Last Descale Date" },
          { id: "boiler_element_ohms", type: "text", label: "Boiler Element Resistance (\u03A9)" },
          { id: "steam_set_temp", type: "text", label: "Steam Mode Set Temp (\u00B0F)" },
          { id: "steam_actual_temp", type: "text", label: "Steam Mode Actual Temp (\u00B0F)" }
        ],
        notesField: true
      },
      {
        id: "water_drainage",
        title: "Water Supply & Drainage",
        type: "checklist",
        items: [
          { id: "water_supply", label: "Water supply line and connections leak-free" },
          { id: "water_filter", label: "Water inlet filter/strainer clean" },
          { id: "external_filtration", label: "External filtration system serviced (if installed)" },
          { id: "drain_line", label: "Drain line clear, proper slope, air gap intact" },
          { id: "floor_drain", label: "Floor drain connection sealed, no backflow" },
          { id: "condensate_tray", label: "Condensate/drain tray inside oven clean" }
        ],
        extraFields: [
          { id: "water_hardness", type: "text", label: "Water Hardness (ppm)" },
          { id: "filter_change_date", type: "text", label: "Filter Change Date" }
        ],
        notesField: true
      },
      {
        id: "convection_heating",
        title: "Convection / Heating System",
        type: "checklist",
        items: [
          { id: "conv_elements", label: "Convection elements undamaged, no warping" },
          { id: "conv_connections", label: "Element terminal connections secure" },
          { id: "conv_contactors", label: "Contactors/relays engage properly" },
          { id: "conv_temp_accuracy", label: "Convection mode temperature accurate" },
          { id: "combi_temp_accuracy", label: "Combi mode temperature accurate" },
          { id: "preheat_time", label: "Preheat time within manufacturer spec" },
          { id: "cavity_sensor", label: "Cavity temperature sensor undamaged" },
          { id: "fan_blades", label: "Convection fan blades clean, no damage or imbalance" },
          { id: "fan_motor", label: "Fan motor quiet, no vibration or overheating" },
          { id: "fan_reversal", label: "Fan direction reversal working (if equipped)" },
          { id: "fan_shaft_seal", label: "Fan motor shaft seal not leaking" }
        ],
        extraFields: [
          { id: "conv_element_ohms", type: "text", label: "Convection Element Resistance (\u03A9)" },
          { id: "conv_set_temp", type: "text", label: "Convection Set Temp (\u00B0F)" },
          { id: "conv_actual_temp", type: "text", label: "Convection Actual Temp (\u00B0F)" },
          { id: "fan_motor_amps", type: "text", label: "Fan Motor Amps" }
        ],
        notesField: true
      },
      {
        id: "controls_probes",
        title: "Controls, Probes & Electrical",
        type: "checklist",
        items: [
          { id: "cooking_modes", label: "All cooking modes working (convection, steam, combi)" },
          { id: "core_probe", label: "Core temperature probe accurate (tested in water bath)" },
          { id: "probe_cable", label: "Core probe cable free of cuts or kinks" },
          { id: "cleaning_cycle", label: "Automatic cleaning/wash cycle completes all stages" },
          { id: "touchscreen", label: "Operator interface responsive" },
          { id: "error_codes", label: "No stored error codes" },
          { id: "wiring_connections", label: "All wiring and connections secure" },
          { id: "firmware", label: "Software/firmware version recorded" },
          { id: "haccp_logging", label: "HACCP data logging functional" }
        ],
        extraFields: [
          { id: "supply_voltage", type: "text", label: "Supply Voltage (V)" },
          { id: "error_codes_list", type: "text", label: "Error Codes (if any)" },
          { id: "firmware_version", type: "text", label: "Firmware Version" },
          { id: "cds_count", type: "text", label: "CDS Counter Reading (Rational)" }
        ],
        notesField: true
      },
      {
        id: "cleaning_system",
        title: "Self-Cleaning System",
        type: "checklist",
        items: [
          { id: "chemical_supply", label: "Cleaning chemical supply adequate" },
          { id: "rinse_supply", label: "Rinse agent supply adequate" },
          { id: "chemical_lines", label: "Chemical supply lines and pump leak-free" },
          { id: "spray_arms", label: "Spray arm(s) functioning, nozzles not clogged" },
          { id: "hand_shower", label: "Hand-held shower/spray functional (if equipped)" },
          { id: "drain_cleaning", label: "Drain operates correctly during cleaning cycle" }
        ],
        notesField: true
      },
      {
        id: "safety",
        title: "Safety Systems",
        type: "checklist",
        items: [
          { id: "high_limit", label: "High-temperature limit safety functional" },
          { id: "door_interlock", label: "Door interlock stops heating and steam on open" },
          { id: "steam_vent", label: "Cool-down vent activates before door opens (no steam burst)" },
          { id: "door_pressure", label: "Door cannot open under pressure" },
          { id: "steam_leaks", label: "No steam leaks around door, drain, or penetrations" },
          { id: "water_near_electric", label: "No water leaks near electrical components" },
          { id: "ground_intact", label: "Proper grounding intact" },
          { id: "gfci", label: "GFCI/ground fault protection functional" },
          { id: "safety_labels", label: "All safety and burn-hazard labels legible" }
        ],
        extraFields: [
          { id: "high_limit_trip", type: "text", label: "High Limit Trip Point (\u00B0F)" }
        ],
        notesField: true
      },
      {
        id: "recommended_actions",
        title: "Recommended Actions",
        type: "checklist",
        items: [
          { id: "action_none", label: "No action needed - all items pass" },
          { id: "action_descale", label: "Boiler descaling needed" },
          { id: "action_gasket", label: "Door gasket replacement needed" },
          { id: "action_heating", label: "Heating element service needed" },
          { id: "action_steam", label: "Steam system repair needed" },
          { id: "action_probe", label: "Core probe replacement needed" },
          { id: "action_cleaning", label: "Cleaning system service needed" },
          { id: "action_controls", label: "Controls/software update needed" },
          { id: "action_water", label: "Water filtration service needed" },
          { id: "action_other", label: "Other (see notes)" }
        ],
        extraFields: [
          {
            id: "priority",
            type: "radio",
            label: "Priority Level",
            options: ["Low", "Medium", "High", "Critical"]
          }
        ],
        notesField: true
      }
    ]
  },

  // ============================================
  // HOT HOLDING & SERVING EQUIPMENT (cont.)
  // ============================================

  service_case: {
    name: "Service Case",
    icon: "\uD83E\uDDCA",
    sections: [
      {
        id: "temp_performance",
        title: "Temperature & Performance",
        type: "checklist",
        items: [
          { id: "proper_temp", label: "Display area maintaining proper temperature" },
          { id: "thermostat_accurate", label: "Thermostat/controller calibrated and accurate" },
          { id: "temp_display", label: "Temperature display readable and functional" },
          { id: "even_temp", label: "Even temperature distribution across display" },
          { id: "no_temp_swings", label: "No excessive temperature swings" },
          { id: "night_curtain", label: "Night curtain/cover functional (if equipped)" }
        ],
        extraFields: [
          { id: "left_temp", type: "text", label: "Left Side Temp (\u00B0F)" },
          { id: "center_temp", type: "text", label: "Center Temp (\u00B0F)" },
          { id: "right_temp", type: "text", label: "Right Side Temp (\u00B0F)" },
          { id: "setpoint", type: "text", label: "Setpoint (\u00B0F)" }
        ],
        notesField: true
      },
      {
        id: "refrigeration",
        title: "Compressor & Refrigeration",
        type: "checklist",
        items: [
          { id: "compressor_running", label: "Compressor running smoothly" },
          { id: "no_unusual_noise", label: "No unusual noises or vibrations" },
          { id: "compressor_cycling", label: "Compressor cycling normally" },
          { id: "refrigerant_charge", label: "Proper refrigerant charge (sight glass clear)" },
          { id: "suction_pressure", label: "Suction pressure within spec" },
          { id: "discharge_pressure", label: "Discharge pressure within spec" },
          { id: "superheat_normal", label: "Superheat within acceptable range" },
          { id: "subcooling_normal", label: "Subcooling within acceptable range" },
          { id: "cutouts_functional", label: "High/low pressure cutouts functional" }
        ],
        extraFields: [
          { id: "compressor_amps", type: "text", label: "Compressor Amps" },
          { id: "suction_psig", type: "text", label: "Suction Pressure (PSIG)" },
          { id: "discharge_psig", type: "text", label: "Discharge Pressure (PSIG)" },
          { id: "superheat", type: "text", label: "Superheat (\u00B0F)" },
          { id: "subcooling", type: "text", label: "Subcooling (\u00B0F)" },
          { id: "refrigerant_type", type: "text", label: "Refrigerant Type" }
        ],
        notesField: true
      },
      {
        id: "evaporator_defrost",
        title: "Evaporator & Defrost",
        type: "checklist",
        items: [
          { id: "evap_clean", label: "Evaporator coil clean and unobstructed" },
          { id: "evap_fans", label: "Evaporator fan(s) running properly" },
          { id: "fan_blades", label: "Fan blades intact, not cracked or bent" },
          { id: "defrost_cycle", label: "Defrost cycle initiating and terminating properly" },
          { id: "no_ice_buildup", label: "No excessive ice/frost on coil" },
          { id: "drain_pan", label: "Evaporator drain pan clear and draining" },
          { id: "drain_line", label: "Condensate drain line clear and flowing" },
          { id: "no_water_under", label: "No standing water under or behind case" }
        ],
        notesField: true
      },
      {
        id: "condenser",
        title: "Condenser System",
        type: "checklist",
        items: [
          { id: "condenser_clean", label: "Condenser coil clean (vacuumed/brushed)" },
          { id: "condenser_fan", label: "Condenser fan operating properly" },
          { id: "adequate_airflow", label: "Adequate airflow around condenser" },
          { id: "no_obstructions", label: "No obstructions blocking air intake/exhaust" },
          { id: "filter_clean", label: "Air filter clean (if equipped)" }
        ],
        extraFields: [
          { id: "condenser_fan_amps", type: "text", label: "Condenser Fan Amps" }
        ],
        notesField: true
      },
      {
        id: "display_glass",
        title: "Display Area & Glass",
        type: "checklist",
        items: [
          { id: "glass_clean", label: "Display glass clean inside and out" },
          { id: "glass_no_cracks", label: "No cracks, chips, or damage to glass" },
          { id: "anti_fog", label: "Anti-fog/anti-sweat heater working" },
          { id: "shelves_secure", label: "Display shelves level and secure" },
          { id: "lighting_working", label: "Display lighting functioning" },
          { id: "price_rail", label: "Price tag rail/channel intact" }
        ],
        notesField: true
      },
      {
        id: "doors_gaskets",
        title: "Doors & Gaskets",
        type: "checklist",
        items: [
          { id: "doors_close", label: "Doors/lids close fully and self-close" },
          { id: "gaskets_intact", label: "Door gaskets intact, no tears or gaps" },
          { id: "gaskets_sealing", label: "Gaskets sealing properly" },
          { id: "hinges_tight", label: "Door hinges tight and aligned" },
          { id: "handles_secure", label: "Door handles secure" },
          { id: "sliding_smooth", label: "Sliding doors glide smoothly (if equipped)" }
        ],
        notesField: true
      },
      {
        id: "recommended_actions",
        title: "Recommended Actions",
        type: "checklist",
        items: [
          { id: "action_none", label: "No action needed - all items pass" },
          { id: "action_refrigeration", label: "Refrigeration system service needed" },
          { id: "action_defrost", label: "Defrost system repair needed" },
          { id: "action_condenser", label: "Condenser coil cleaning needed" },
          { id: "action_gasket", label: "Gasket replacement needed" },
          { id: "action_fan", label: "Fan motor replacement needed" },
          { id: "action_lighting", label: "Lighting repair/replacement needed" },
          { id: "action_glass", label: "Glass repair/replacement needed" },
          { id: "action_drain", label: "Drain line clearing needed" },
          { id: "action_other", label: "Other (see notes)" }
        ],
        extraFields: [
          {
            id: "case_type",
            type: "radio",
            label: "Case Type",
            options: ["Deli", "Bakery", "Produce", "Meat"]
          },
          {
            id: "priority",
            type: "radio",
            label: "Priority Level",
            options: ["Low", "Medium", "High", "Critical"]
          }
        ],
        notesField: true
      }
    ]
  },

  donut_glazer: {
    name: "Donut Glazer / Icing Table",
    icon: "\uD83C\uDF69",
    sections: [
      {
        id: "reservoir_temp",
        title: "Heated Reservoir & Temperature",
        type: "checklist",
        items: [
          { id: "glaze_temp", label: "Glaze reservoir reaching temperature (135-140\u00B0F)" },
          { id: "thermostat_accurate", label: "Thermostat calibrated and accurate" },
          { id: "temp_control", label: "Temperature control responsive" },
          { id: "even_heating", label: "Even heat distribution across reservoir" },
          { id: "no_overheating", label: "No overheating or scorching at edges" },
          { id: "water_jacket", label: "Water jacket level adequate (water-heated models)" },
          { id: "no_water_leaks", label: "No leaks from water jacket or reservoir" }
        ],
        extraFields: [
          { id: "reservoir_temp_reading", type: "text", label: "Reservoir Temp (\u00B0F)" },
          { id: "thermostat_setpoint", type: "text", label: "Thermostat Setpoint (\u00B0F)" }
        ],
        notesField: true
      },
      {
        id: "mechanical",
        title: "Mechanical Components",
        type: "checklist",
        items: [
          { id: "agitator_working", label: "Agitator operating, preventing glaze crusting" },
          { id: "agitator_speed", label: "Agitator speed appropriate (not splashing)" },
          { id: "agitator_shaft", label: "Agitator shaft not bent or worn" },
          { id: "pump_operating", label: "Recirculation pump operating (if equipped)" },
          { id: "pump_no_leaks", label: "No leaks at pump seals" },
          { id: "drive_motor", label: "Drive motor running smoothly" },
          { id: "gearbox_quiet", label: "Gearbox/drive mechanism quiet" },
          { id: "lift_mechanism", label: "Dipping/lift mechanism smooth (if equipped)" }
        ],
        notesField: true
      },
      {
        id: "reservoir_surfaces",
        title: "Reservoir & Surfaces",
        type: "checklist",
        items: [
          { id: "reservoir_clean", label: "Reservoir interior clean, no buildup" },
          { id: "reservoir_no_damage", label: "No dents, cracks, or pitting in reservoir" },
          { id: "welds_intact", label: "Reservoir welds intact (no seepage)" },
          { id: "drain_valve", label: "Reservoir drain valve opens/closes properly" },
          { id: "drain_no_leak", label: "No leaks at drain valve" },
          { id: "work_surface", label: "Work surface/glazing table clean and smooth" },
          { id: "stainless_condition", label: "Stainless steel surfaces in good condition" }
        ],
        notesField: true
      },
      {
        id: "conveyor_belt",
        title: "Conveyor & Belt (Inline Units)",
        type: "checklist",
        items: [
          { id: "belt_condition", label: "Belt/mesh in good condition (no broken links)" },
          { id: "belt_clean", label: "Belt clean, glaze buildup not affecting operation" },
          { id: "belt_speed", label: "Belt speed adjustable and holding setpoint" },
          { id: "sprockets", label: "Drive sprockets/rollers intact and not worn" },
          { id: "bearings_smooth", label: "Bearings rotating smoothly" },
          { id: "glaze_curtain", label: "Glaze curtain flowing evenly across full width" },
          { id: "return_trough", label: "Glaze return trough clear and flowing" }
        ],
        notesField: true
      },
      {
        id: "electrical",
        title: "Electrical System",
        type: "checklist",
        items: [
          { id: "elements_functioning", label: "Heating element(s) functioning" },
          { id: "elements_no_damage", label: "No visible damage on elements" },
          { id: "power_cord", label: "Power cord intact" },
          { id: "connections_tight", label: "All electrical connections tight" },
          { id: "no_arcing", label: "No signs of arcing or burning" },
          { id: "ground_intact", label: "Ground connection intact" },
          { id: "proper_voltage", label: "Voltage at unit within spec" }
        ],
        extraFields: [
          { id: "voltage", type: "text", label: "Voltage Reading (V)" },
          { id: "amp_draw", type: "text", label: "Amp Draw (A)" }
        ],
        notesField: true
      },
      {
        id: "recommended_actions",
        title: "Recommended Actions",
        type: "checklist",
        items: [
          { id: "action_none", label: "No action needed - all items pass" },
          { id: "action_thermostat", label: "Thermostat calibration/replacement needed" },
          { id: "action_element", label: "Heating element repair needed" },
          { id: "action_pump", label: "Pump repair/replacement needed" },
          { id: "action_agitator", label: "Agitator repair needed" },
          { id: "action_belt", label: "Conveyor belt repair needed" },
          { id: "action_motor", label: "Drive motor service needed" },
          { id: "action_drain", label: "Drain valve repair needed" },
          { id: "action_other", label: "Other (see notes)" }
        ],
        extraFields: [
          {
            id: "glazer_type",
            type: "radio",
            label: "Unit Type",
            options: ["Hand Glazer", "EZLift Glazer", "Inline Conveyor", "Icing Table"]
          },
          {
            id: "priority",
            type: "radio",
            label: "Priority Level",
            options: ["Low", "Medium", "High", "Critical"]
          }
        ],
        notesField: true
      }
    ]
  },

  // ============================================
  // FOOD PREP EQUIPMENT
  // ============================================

  deli_slicer: {
    name: "Deli Slicer",
    icon: "\uD83E\uDD69",
    sections: [
      {
        id: "blade_assembly",
        title: "Blade & Sharpening System",
        type: "checklist",
        items: [
          { id: "blade_edge", label: "Blade edge free of nicks, chips, or cracks" },
          { id: "blade_no_wobble", label: "No blade wobble during rotation (runout)" },
          { id: "blade_sharp", label: "Blade cuts cleanly without tearing" },
          { id: "sharpening_stones", label: "Sharpening stones free of wear, cracks, or glazing" },
          { id: "stone_assembly", label: "Stone assembly swings freely and locks" },
          { id: "blade_hub_nut", label: "Blade hub and retaining nut tight" },
          { id: "blade_surface", label: "No deep scratches or surface damage on blade" }
        ],
        notesField: true
      },
      {
        id: "guards",
        title: "Ring Guard & Blade Guard",
        type: "checklist",
        items: [
          { id: "ring_guard_present", label: "Ring guard present and securely mounted" },
          { id: "ring_guard_mount", label: "Ring guard mount free of cracks or food buildup" },
          { id: "blade_guard_clean", label: "Inside of blade guard free of buildup or damage" },
          { id: "blade_guard_covers", label: "Blade guard covers non-slicing portion completely" },
          { id: "guard_clearance", label: "Ring guard not contacting blade" },
          { id: "guard_fasteners", label: "All guard fasteners tight" }
        ],
        notesField: true
      },
      {
        id: "carriage_gauge",
        title: "Carriage & Thickness Control",
        type: "checklist",
        items: [
          { id: "carriage_smooth", label: "Carriage slides smoothly without binding" },
          { id: "slide_rods", label: "Slide rods free of scoring, corrosion, or buildup" },
          { id: "slide_rods_lubed", label: "Slide rods lubricated with slicer oil" },
          { id: "gauge_plate_secure", label: "Gauge plate secure, no wobble" },
          { id: "thickness_dial", label: "Thickness dial turns smoothly through full range" },
          { id: "zero_position", label: "Zero position fully closes gauge plate to blade" },
          { id: "pusher_tension", label: "Product pusher/grip proper tension" }
        ],
        notesField: true
      },
      {
        id: "motor_drive",
        title: "Motor & Drive",
        type: "checklist",
        items: [
          { id: "motor_quiet", label: "Motor free of unusual noise, vibration, overheating" },
          { id: "drive_belt", label: "Drive belt proper tension, no cracks or glazing" },
          { id: "blade_rpm", label: "Proper blade RPM" },
          { id: "on_off_switch", label: "ON/OFF switch positive engagement" },
          { id: "power_cord", label: "Power cord and plug undamaged" },
          { id: "ground_intact", label: "Proper grounding (3-prong, continuity)" },
          { id: "motor_bolts", label: "Motor mounting bolts tight" }
        ],
        extraFields: [
          { id: "motor_amps", type: "text", label: "Motor Amps Under Load" }
        ],
        notesField: true
      },
      {
        id: "seams_seals",
        title: "Seams, Seals & Gaskets (FDA)",
        type: "checklist",
        items: [
          { id: "seams_intact", label: "All seams between parts free of separation" },
          { id: "sealants_intact", label: "Sealants free of degradation or cracking" },
          { id: "gaskets_intact", label: "All gaskets undamaged and properly seated" },
          { id: "gasket_defective", label: "No broken, missing, or unattached seals (FDA: remove from service)" },
          { id: "handle_seams", label: "Surfaces under handle free of debris in seams" }
        ],
        notesField: true
      },
      {
        id: "safety_operational",
        title: "Safety & Operational",
        type: "checklist",
        items: [
          { id: "blade_stops", label: "Blade stops within acceptable coast-down time" },
          { id: "thickness_zero", label: "Thickness dial returns to zero when not in use" },
          { id: "meat_grip", label: "Meat grip/product holder prevents hand contact with blade" },
          { id: "safety_labels", label: "All safety labels and warnings legible" },
          { id: "food_surfaces", label: "All food-contact surfaces free of cracks or pitting" },
          { id: "overall_condition", label: "Overall condition acceptable for continued service" }
        ],
        extraFields: [
          {
            id: "condition_rating",
            type: "radio",
            label: "Condition Rating",
            options: ["Serviceable", "Needs Repair", "Remove from Service"]
          }
        ],
        notesField: true
      },
      {
        id: "recommended_actions",
        title: "Recommended Actions",
        type: "checklist",
        items: [
          { id: "action_none", label: "No action needed - all items pass" },
          { id: "action_blade", label: "Blade sharpening/replacement needed" },
          { id: "action_guards", label: "Guard repair/replacement needed" },
          { id: "action_belt", label: "Drive belt replacement needed" },
          { id: "action_seals", label: "Seal/gasket replacement needed (FDA)" },
          { id: "action_motor", label: "Motor service needed" },
          { id: "action_carriage", label: "Carriage/slide service needed" },
          { id: "action_other", label: "Other (see notes)" }
        ],
        extraFields: [
          {
            id: "priority",
            type: "radio",
            label: "Priority Level",
            options: ["Low", "Medium", "High", "Critical"]
          }
        ],
        notesField: true
      }
    ]
  },

  bread_slicer: {
    name: "Bread Slicer",
    icon: "\uD83C\uDF5E",
    sections: [
      {
        id: "blade_assembly",
        title: "Blade Assembly & Frame",
        type: "checklist",
        items: [
          { id: "blades_condition", label: "All blades free of dullness, bending, or cracks" },
          { id: "blades_populated", label: "All blade positions populated (none missing)" },
          { id: "blade_tension", label: "Blade tension uniform across frame" },
          { id: "blade_frame", label: "Upper blade frame free of cracks or warping" },
          { id: "blade_spacers", label: "Blade spacers correct and uniform" },
          { id: "band_blade_weld", label: "Band blade weld free of cracks (band-knife models)" },
          { id: "band_blade_tracking", label: "Band blade tracking correctly (band-knife models)" }
        ],
        notesField: true
      },
      {
        id: "safety_interlocks",
        title: "Safety Interlocks & Guards (OSHA 1910.263)",
        type: "checklist",
        items: [
          { id: "cover_interlock", label: "Knife head cover interlock - machine won't run without cover" },
          { id: "door_interlocks", label: "All access door/panel interlocks de-energize motor on open" },
          { id: "magnet_brake", label: "Magnet brake stops blade when motor off (band-knife)" },
          { id: "ring_guard", label: "Ring guard covers non-slicing blade portion (band-knife)" },
          { id: "guard_panels", label: "All guard panels secure and undamaged" },
          { id: "emergency_stop", label: "Emergency stop button functional and accessible" },
          { id: "safety_labels", label: "All safety and interlock warning labels legible" }
        ],
        notesField: true
      },
      {
        id: "feed_system",
        title: "Feed System & Pusher",
        type: "checklist",
        items: [
          { id: "pusher_condition", label: "Bread pusher/press plate free of wear or cracking" },
          { id: "even_pressure", label: "Pusher applies even pressure across loaf" },
          { id: "height_adjust", label: "Upper conveyor height adjustment smooth" },
          { id: "lateral_guides", label: "Lateral guides properly aligned" },
          { id: "feed_smooth", label: "Feed system consistent, no jamming" },
          { id: "feed_chute", label: "Feed chute/hopper free of damage or obstructions" }
        ],
        notesField: true
      },
      {
        id: "motor_drive",
        title: "Motor & Drive",
        type: "checklist",
        items: [
          { id: "motor_quiet", label: "Motor free of unusual noise or overheating" },
          { id: "drive_belt", label: "Drive belt(s) proper tension, no cracks" },
          { id: "on_off_switch", label: "ON/OFF switch positive engagement" },
          { id: "power_cord", label: "Power cord and plug undamaged" },
          { id: "ground_intact", label: "Proper grounding" },
          { id: "wiring_connections", label: "All wiring connections secure" }
        ],
        extraFields: [
          { id: "motor_amps", type: "text", label: "Motor Amps Under Load" }
        ],
        notesField: true
      },
      {
        id: "sanitation",
        title: "Sanitation & Condition",
        type: "checklist",
        items: [
          { id: "crumb_tray", label: "Crumb tray present and fits properly" },
          { id: "crumb_buildup", label: "No crumb buildup in blade frame or housing" },
          { id: "food_surfaces", label: "All food-contact surfaces free of corrosion" },
          { id: "machine_level", label: "Machine level and stable" },
          { id: "slice_consistent", label: "Slice count and thickness consistent" }
        ],
        notesField: true
      },
      {
        id: "recommended_actions",
        title: "Recommended Actions",
        type: "checklist",
        items: [
          { id: "action_none", label: "No action needed - all items pass" },
          { id: "action_blades", label: "Blade replacement needed" },
          { id: "action_interlocks", label: "Safety interlock repair needed" },
          { id: "action_brake", label: "Magnet brake service needed" },
          { id: "action_belt", label: "Drive belt replacement needed" },
          { id: "action_feed", label: "Feed system repair needed" },
          { id: "action_motor", label: "Motor service needed" },
          { id: "action_other", label: "Other (see notes)" }
        ],
        extraFields: [
          {
            id: "priority",
            type: "radio",
            label: "Priority Level",
            options: ["Low", "Medium", "High", "Critical"]
          }
        ],
        notesField: true
      }
    ]
  },

  stand_mixer: {
    name: "Stand Mixer",
    icon: "\uD83E\uDD5A",
    sections: [
      {
        id: "bowl_lift",
        title: "Bowl, Bowl Lift & Mounting",
        type: "checklist",
        items: [
          { id: "bowl_condition", label: "Mixing bowl free of cracks, dents, or corrosion" },
          { id: "bowl_clamp", label: "Bowl clamp/lock mechanism engages securely" },
          { id: "bowl_lift", label: "Bowl lift smooth through full range" },
          { id: "lift_rails", label: "Bowl lift slide rails free of wear or debris" },
          { id: "lift_lubed", label: "Bowl lift rails and gearing lubricated" },
          { id: "bowl_guides", label: "Plastic bowl guides secure" },
          { id: "bowl_centered", label: "Bowl seats properly and centered under agitator" }
        ],
        notesField: true
      },
      {
        id: "planetary_agitator",
        title: "Planetary & Agitator",
        type: "checklist",
        items: [
          { id: "planetary_no_leak", label: "Planetary assembly free of grease leaks" },
          { id: "planetary_gear", label: "Planetary gear free of excessive play" },
          { id: "agitator_shaft", label: "Agitator shaft free of wear or scoring" },
          { id: "shaft_seal", label: "Agitator shaft seal intact, not leaking" },
          { id: "attachment_hub", label: "Attachment hub and plates free of wear" },
          { id: "locking_pin", label: "Attachment locking pin secures attachments" },
          { id: "attachments_condition", label: "Dough hook, beater, whip free of damage" },
          { id: "no_scrape", label: "Attachments do not scrape bowl during operation" }
        ],
        extraFields: [
          { id: "agitator_clearance", type: "text", label: "Agitator-to-Bowl Clearance (inches)" }
        ],
        notesField: true
      },
      {
        id: "transmission",
        title: "Transmission & Lubrication",
        type: "checklist",
        items: [
          { id: "gear_oil_level", label: "Gear oil level correct (sight glass/fill plug)" },
          { id: "gear_oil_condition", label: "Gear oil clean (not milky or dark)" },
          { id: "gear_noise", label: "No grinding, clicking, or whining during operation" },
          { id: "gear_play", label: "No excessive play in gear train" },
          { id: "transmission_housing", label: "Transmission housing free of cracks or oil leaks" },
          { id: "drive_belt", label: "Drive belt proper tension, no cracks (if belt-driven)" }
        ],
        notesField: true
      },
      {
        id: "motor_electrical",
        title: "Motor & Electrical",
        type: "checklist",
        items: [
          { id: "motor_quiet", label: "Motor free of unusual noise or overheating" },
          { id: "on_off_switch", label: "ON/OFF switch positive engagement" },
          { id: "speed_selector", label: "Speed selector engages properly at each speed" },
          { id: "timer_function", label: "Timer functioning (if equipped)" },
          { id: "power_cord", label: "Power cord and plug undamaged" },
          { id: "ground_intact", label: "Proper grounding" },
          { id: "wiring_connections", label: "All wiring connections secure" }
        ],
        extraFields: [
          { id: "motor_amps", type: "text", label: "Motor Amps Under Load" }
        ],
        notesField: true
      },
      {
        id: "safety",
        title: "Safety Systems",
        type: "checklist",
        items: [
          { id: "bowl_guard", label: "Wire safety cage/bowl guard present and latches" },
          { id: "guard_interlock", label: "Safety interlock - mixer won't run with guard open" },
          { id: "no_shift_running", label: "Cannot shift gear while running (if applicable)" },
          { id: "stable_surface", label: "Mixer stable, will not walk during operation" },
          { id: "safety_labels", label: "Safety labels and capacity warnings legible" }
        ],
        notesField: true
      },
      {
        id: "recommended_actions",
        title: "Recommended Actions",
        type: "checklist",
        items: [
          { id: "action_none", label: "No action needed - all items pass" },
          { id: "action_planetary", label: "Planetary seal/gear service needed" },
          { id: "action_bowl_lift", label: "Bowl lift repair needed" },
          { id: "action_oil", label: "Gear oil change needed" },
          { id: "action_belt", label: "Drive belt replacement needed" },
          { id: "action_motor", label: "Motor service needed" },
          { id: "action_attachments", label: "Attachment replacement needed" },
          { id: "action_other", label: "Other (see notes)" }
        ],
        extraFields: [
          {
            id: "priority",
            type: "radio",
            label: "Priority Level",
            options: ["Low", "Medium", "High", "Critical"]
          }
        ],
        notesField: true
      }
    ]
  },

  meat_saw: {
    name: "Meat Saw",
    icon: "\uD83E\uDD69",
    sections: [
      {
        id: "blade_tracking",
        title: "Blade, Tracking & Tension",
        type: "checklist",
        items: [
          { id: "blade_teeth", label: "Blade free of cracks, missing teeth, weld issues" },
          { id: "blade_tension", label: "Blade tension within spec" },
          { id: "blade_tracking", label: "Blade tracks centered on both wheels" },
          { id: "tracking_gap", label: "Blade-to-flange gap approximately 1/8\"" },
          { id: "no_twist_kinks", label: "Blade free of twist, kinks, or flat spots" },
          { id: "blade_correct", label: "Correct blade width, gauge, and tooth pitch" }
        ],
        extraFields: [
          { id: "blade_tension_reading", type: "text", label: "Blade Tension Reading" }
        ],
        notesField: true
      },
      {
        id: "guides_wheels",
        title: "Guides, Wheels & Bearings",
        type: "checklist",
        items: [
          { id: "upper_guides", label: "Upper blade guides free of wear" },
          { id: "lower_guides", label: "Lower blade guides free of wear" },
          { id: "guides_snug", label: "Guides snug against blade without binding" },
          { id: "upper_wheel", label: "Upper wheel (idler) rotates smoothly" },
          { id: "lower_wheel", label: "Lower wheel (drive) free of wear or damage" },
          { id: "wheel_bearings", label: "Band wheel bearings free of noise or heat" },
          { id: "wheel_tires", label: "Wheel tires/surfaces free of wear or cracking" }
        ],
        notesField: true
      },
      {
        id: "table_vise",
        title: "Table, Vise & Pusher",
        type: "checklist",
        items: [
          { id: "table_surface", label: "Table surface free of scoring or warping" },
          { id: "table_slides", label: "Table slides smoothly without excessive play" },
          { id: "vise_jaws", label: "Vise jaws free of wear" },
          { id: "vise_clamp", label: "Vise clamping mechanism holds securely" },
          { id: "pusher_blocks", label: "Pusher blocks and thickness guides functional" },
          { id: "throat_plate", label: "Table insert/throat plate undamaged" },
          { id: "table_level", label: "Table level and aligned with blade" }
        ],
        notesField: true
      },
      {
        id: "motor_drive",
        title: "Motor & Drive",
        type: "checklist",
        items: [
          { id: "motor_quiet", label: "Motor free of unusual noise or overheating" },
          { id: "drive_belts", label: "Drive belts proper tension, no cracks" },
          { id: "pulleys_aligned", label: "Pulleys aligned and secure" },
          { id: "drive_wheel_play", label: "Drive wheel free of excessive play" },
          { id: "hydraulic_oil", label: "Hydraulic oil level adequate (if hydraulic feed)" },
          { id: "hydraulic_lines", label: "Hydraulic lines leak-free (if equipped)" },
          { id: "gearbox_oil", label: "Gearbox oil level adequate" }
        ],
        extraFields: [
          { id: "motor_amps", type: "text", label: "Motor Amps Under Load" }
        ],
        notesField: true
      },
      {
        id: "safety_guards",
        title: "Safety Guards & Emergency Controls",
        type: "checklist",
        items: [
          { id: "upper_guard", label: "Upper blade guard present and adjustable" },
          { id: "guard_clearance", label: "Guard set ~1/4\" above workpiece during operation" },
          { id: "door_interlocks", label: "All door/panel interlocks de-energize motor on open" },
          { id: "emergency_stop", label: "Emergency stop functional and accessible" },
          { id: "blade_brake", label: "Blade brake engages when motor off" },
          { id: "guard_hardware", label: "All guard hardware undamaged" },
          { id: "safety_labels", label: "All safety labels and warnings legible" }
        ],
        notesField: true
      },
      {
        id: "sanitation",
        title: "Sanitation & Structural",
        type: "checklist",
        items: [
          { id: "food_surfaces", label: "All food-contact surfaces free of corrosion or pitting" },
          { id: "debris_housing", label: "Wheel housing and guide areas free of debris" },
          { id: "food_grade_lube", label: "Food-grade lubricant used in all components" },
          { id: "machine_level", label: "Machine level and stable" },
          { id: "adequate_lighting", label: "Adequate lighting at cutting surface" }
        ],
        notesField: true
      },
      {
        id: "recommended_actions",
        title: "Recommended Actions",
        type: "checklist",
        items: [
          { id: "action_none", label: "No action needed - all items pass" },
          { id: "action_blade", label: "Blade replacement needed" },
          { id: "action_guides", label: "Guide block replacement needed" },
          { id: "action_bearings", label: "Wheel bearing replacement needed" },
          { id: "action_belt", label: "Drive belt replacement needed" },
          { id: "action_brake", label: "Blade brake service needed" },
          { id: "action_interlocks", label: "Safety interlock repair needed" },
          { id: "action_table", label: "Table/vise repair needed" },
          { id: "action_other", label: "Other (see notes)" }
        ],
        extraFields: [
          {
            id: "priority",
            type: "radio",
            label: "Priority Level",
            options: ["Low", "Medium", "High", "Critical"]
          }
        ],
        notesField: true
      }
    ]
  },

  // ============================================
  // REFRIGERATED DISPLAY CASES
  // ============================================

  bunker_case: {
    name: "Bunker Case",
    icon: "\uD83E\uDDCA",
    sections: [
      {
        id: "case_temp",
        title: "Case Temperature & Product Condition",
        type: "checklist",
        items: [
          { id: "product_temp", label: "Product temperature within acceptable range" },
          { id: "discharge_temp", label: "Discharge air temperature within spec" },
          { id: "return_temp", label: "Return air temperature within spec" },
          { id: "below_load_line", label: "Product loaded below the load line" },
          { id: "even_distribution", label: "Even temperature distribution across case length" },
          { id: "no_warm_spots", label: "No warm spots or product thawing detected" },
          { id: "night_cover", label: "Night cover/energy cover in good condition (if equipped)" }
        ],
        extraFields: [
          { id: "product_temp_f", type: "text", label: "Product Temp (\u00B0F)" },
          { id: "discharge_air_f", type: "text", label: "Discharge Air Temp (\u00B0F)" },
          { id: "return_air_f", type: "text", label: "Return Air Temp (\u00B0F)" },
          { id: "setpoint_f", type: "text", label: "Case Setpoint (\u00B0F)" }
        ],
        notesField: true
      },
      {
        id: "air_curtain",
        title: "Air Curtain & Airflow",
        type: "checklist",
        items: [
          { id: "curtain_clean", label: "Air curtain grille/panel unobstructed and clean" },
          { id: "discharge_grille", label: "Discharge air grille free of ice, frost, or debris" },
          { id: "return_grille", label: "Return air grille free of ice, frost, or debris" },
          { id: "airflow_consistent", label: "Airflow pattern consistent across full length" },
          { id: "no_blockage", label: "No product or signage blocking air curtain" },
          { id: "baffles_set", label: "Adjustable air baffles properly positioned (if equipped)" }
        ],
        notesField: true
      },
      {
        id: "evaporator_defrost",
        title: "Evaporator & Defrost System",
        type: "checklist",
        items: [
          { id: "evap_clean", label: "Evaporator coil clean, free of excessive frost/ice" },
          { id: "evap_fans", label: "Evaporator fan motor(s) operating and spinning freely" },
          { id: "fan_blades", label: "Evaporator fan blade(s) in good condition" },
          { id: "defrost_initiating", label: "Defrost cycle initiating per schedule" },
          { id: "defrost_heaters", label: "Defrost heaters energizing properly" },
          { id: "defrost_termination", label: "Defrost termination sensor functioning correctly" },
          { id: "fan_delay", label: "Fan delay relay functioning after defrost" },
          { id: "drain_pan_heater", label: "Drain pan heater operational (no ice blockage)" }
        ],
        extraFields: [
          { id: "defrost_heater_amps", type: "text", label: "Defrost Heater Amps" },
          { id: "evap_coil_temp", type: "text", label: "Evaporator Coil Temp (\u00B0F)" }
        ],
        notesField: true
      },
      {
        id: "condensate_drain",
        title: "Condensate & Drain System",
        type: "checklist",
        items: [
          { id: "drain_pan_clean", label: "Drain pan clean, free of debris and standing water" },
          { id: "drain_line_clear", label: "Drain line clear, unobstructed, and free-flowing" },
          { id: "drain_line_heater", label: "Drain line heater functioning (freezer application)" },
          { id: "no_floor_puddles", label: "Condensate draining properly (no floor puddles)" },
          { id: "drain_trap", label: "Drain trap intact and filled (if applicable)" }
        ],
        notesField: true
      },
      {
        id: "refrigeration",
        title: "Refrigeration System",
        type: "checklist",
        items: [
          { id: "compressor_smooth", label: "Compressor/rack circuit running smoothly" },
          { id: "suction_pressure", label: "Suction pressure within normal operating range" },
          { id: "discharge_pressure", label: "Discharge/head pressure within normal range" },
          { id: "sight_glass", label: "Liquid line sight glass clear (no bubbles)" },
          { id: "txv_feeding", label: "TXV or metering device feeding properly" },
          { id: "superheat_ok", label: "Superheat within acceptable range (8-12\u00B0F TXV)" },
          { id: "subcooling_ok", label: "Subcooling within acceptable range (10-18\u00B0F)" },
          { id: "no_leaks", label: "No refrigerant leaks detected" },
          { id: "compressor_amps_ok", label: "Compressor amp draw within nameplate rating" },
          { id: "oil_level", label: "Oil level in compressor sight glass adequate" }
        ],
        extraFields: [
          { id: "suction_psig", type: "text", label: "Suction Pressure (PSIG)" },
          { id: "discharge_psig", type: "text", label: "Discharge Pressure (PSIG)" },
          { id: "superheat_f", type: "text", label: "Superheat (\u00B0F)" },
          { id: "subcooling_f", type: "text", label: "Subcooling (\u00B0F)" },
          { id: "compressor_amps", type: "text", label: "Compressor Amps" },
          { id: "refrigerant_type", type: "text", label: "Refrigerant Type" }
        ],
        notesField: true
      },
      {
        id: "case_body",
        title: "Case Body & Physical Condition",
        type: "checklist",
        items: [
          { id: "exterior_panels", label: "Exterior panels and bumper rails in good condition" },
          { id: "interior_liner", label: "Interior liner clean, free of cracks or corrosion" },
          { id: "case_lighting", label: "Case lighting operational" },
          { id: "price_rail", label: "Price rail/label holders intact and secure" },
          { id: "shelving", label: "Shelving/wire baskets in good condition" },
          { id: "casters_level", label: "Casters/leveling feet secure and unit level" },
          { id: "no_sweating", label: "No condensation/sweating on exterior surfaces" }
        ],
        notesField: true
      },
      {
        id: "electrical_controls",
        title: "Electrical & Controls",
        type: "checklist",
        items: [
          { id: "controller_working", label: "Case controller/thermostat functioning properly" },
          { id: "sensors_accurate", label: "Temperature sensors/probes reading accurately" },
          { id: "connections_tight", label: "All electrical connections tight and corrosion-free" },
          { id: "wiring_condition", label: "Wiring in good condition (no frayed/exposed wires)" },
          { id: "anti_sweat", label: "Anti-sweat heaters functioning (if equipped)" },
          { id: "door_switch", label: "Door/lid switch functioning (if glass-lid bunker)" }
        ],
        extraFields: [
          { id: "supply_voltage", type: "text", label: "Supply Voltage (V)" }
        ],
        notesField: true
      },
      {
        id: "recommended_actions",
        title: "Recommended Actions",
        type: "checklist",
        items: [
          { id: "action_none", label: "No action needed - all items pass" },
          { id: "action_evap", label: "Evaporator coil cleaning/defrost repair needed" },
          { id: "action_refrigerant", label: "Refrigerant charge adjustment or leak repair needed" },
          { id: "action_drain", label: "Drain system service needed" },
          { id: "action_controller", label: "Case controller or sensor replacement needed" },
          { id: "action_txv", label: "TXV/metering device service needed" },
          { id: "action_airflow", label: "Air curtain/airflow restoration needed" },
          { id: "action_other", label: "Other (see notes)" }
        ],
        extraFields: [
          {
            id: "case_application",
            type: "radio",
            label: "Case Application",
            options: ["Frozen", "Dairy/Medium-Temp", "Ice Cream"]
          },
          {
            id: "priority",
            type: "radio",
            label: "Priority Level",
            options: ["Low", "Medium", "High", "Critical"]
          }
        ],
        notesField: true
      }
    ]
  },

  berry_bar: {
    name: "Berry Bar / Produce Cooler",
    icon: "\uD83C\uDF53",
    sections: [
      {
        id: "case_temp",
        title: "Case Temperature & Product Quality",
        type: "checklist",
        items: [
          { id: "product_temp", label: "Product temperature within range (34-41\u00B0F)" },
          { id: "discharge_temp", label: "Discharge air temperature within spec" },
          { id: "return_temp", label: "Return air temperature within spec" },
          { id: "even_distribution", label: "Even temperature distribution across case" },
          { id: "produce_fresh", label: "Produce appears fresh (no wilting, drying, freezing)" },
          { id: "below_load_line", label: "Product loaded within recommended zone" },
          { id: "no_warm_spots", label: "No warm spots or temperature inconsistencies" }
        ],
        extraFields: [
          { id: "product_temp_f", type: "text", label: "Product Temp (\u00B0F)" },
          { id: "discharge_air_f", type: "text", label: "Discharge Air Temp (\u00B0F)" },
          { id: "return_air_f", type: "text", label: "Return Air Temp (\u00B0F)" },
          { id: "setpoint_f", type: "text", label: "Case Setpoint (\u00B0F)" }
        ],
        notesField: true
      },
      {
        id: "air_curtain",
        title: "Air Curtain & Airflow",
        type: "checklist",
        items: [
          { id: "curtain_operating", label: "Air curtain operating and maintaining cold zone" },
          { id: "discharge_clean", label: "Discharge air grille clean and unobstructed" },
          { id: "return_clean", label: "Return air grille at base clean and unobstructed" },
          { id: "airflow_consistent", label: "Airflow consistent across full width" },
          { id: "no_blockage", label: "No product/signage blocking air paths" },
          { id: "fan_speed", label: "Air curtain fans operating at correct speed" },
          { id: "no_infiltration", label: "No significant ambient air infiltration" }
        ],
        notesField: true
      },
      {
        id: "humidity_misting",
        title: "Humidity & Misting System",
        type: "checklist",
        items: [
          { id: "humidity_adequate", label: "Humidity level adequate for produce preservation" },
          { id: "nozzles_clean", label: "Misting nozzles clean and spraying evenly (if equipped)" },
          { id: "mist_timer", label: "Misting timer/controller operating per schedule" },
          { id: "water_supply", label: "Misting water supply connected and flowing" },
          { id: "no_pooling", label: "No excessive water pooling on shelves or product" },
          { id: "pump_filter", label: "Misting pump and filter in good condition" },
          { id: "no_scale", label: "No mineral/scale buildup on nozzles or shelves" }
        ],
        notesField: true
      },
      {
        id: "evaporator_defrost",
        title: "Evaporator & Defrost System",
        type: "checklist",
        items: [
          { id: "evap_clean", label: "Evaporator coil clean, free of frost/ice buildup" },
          { id: "evap_fans", label: "Evaporator fan motor(s) operating properly" },
          { id: "fan_blades", label: "Evaporator fan blade(s) in good condition" },
          { id: "defrost_cycle", label: "Defrost cycle initiating and terminating per schedule" },
          { id: "no_ice", label: "No ice accumulation on evaporator between defrosts" },
          { id: "defrost_drain", label: "Defrost drain clear and draining properly" },
          { id: "fan_delay", label: "Fan delay relay functioning" }
        ],
        extraFields: [
          { id: "evap_coil_temp", type: "text", label: "Evaporator Coil Temp (\u00B0F)" }
        ],
        notesField: true
      },
      {
        id: "condensate_drain",
        title: "Condensate & Drain System",
        type: "checklist",
        items: [
          { id: "drain_pan_clean", label: "Drain pan clean, free of debris/mold/algae" },
          { id: "drain_line_clear", label: "Drain line clear, free-flowing, properly trapped" },
          { id: "evap_pan", label: "Condensate evaporator pan functional (self-contained)" },
          { id: "no_floor_water", label: "No water on floor around or in front of case" },
          { id: "drain_heater", label: "Drain pan heater operational (if equipped)" },
          { id: "no_odors", label: "No musty or mildew odors from drain system" }
        ],
        notesField: true
      },
      {
        id: "refrigeration",
        title: "Refrigeration System",
        type: "checklist",
        items: [
          { id: "compressor_smooth", label: "Compressor/rack circuit running smoothly" },
          { id: "suction_pressure", label: "Suction pressure within normal range" },
          { id: "discharge_pressure", label: "Discharge/head pressure within normal range" },
          { id: "sight_glass", label: "Liquid line sight glass clear" },
          { id: "txv_feeding", label: "TXV or metering device feeding properly" },
          { id: "superheat_ok", label: "Superheat within acceptable range (8-12\u00B0F)" },
          { id: "subcooling_ok", label: "Subcooling within acceptable range (10-18\u00B0F)" },
          { id: "no_leaks", label: "No refrigerant leaks detected" },
          { id: "compressor_amps_ok", label: "Compressor amp draw within nameplate rating" },
          { id: "oil_level", label: "Oil level adequate (if accessible)" }
        ],
        extraFields: [
          { id: "suction_psig", type: "text", label: "Suction Pressure (PSIG)" },
          { id: "discharge_psig", type: "text", label: "Discharge Pressure (PSIG)" },
          { id: "superheat_f", type: "text", label: "Superheat (\u00B0F)" },
          { id: "subcooling_f", type: "text", label: "Subcooling (\u00B0F)" },
          { id: "compressor_amps", type: "text", label: "Compressor Amps" },
          { id: "refrigerant_type", type: "text", label: "Refrigerant Type" }
        ],
        notesField: true
      },
      {
        id: "case_body",
        title: "Case Body, Shelving & Lighting",
        type: "checklist",
        items: [
          { id: "exterior_panels", label: "Exterior panels in good condition" },
          { id: "interior_clean", label: "Interior surfaces clean, free of mold/mildew" },
          { id: "shelving_secure", label: "Display shelving clean, secure, properly angled" },
          { id: "shelf_clips", label: "Shelf clips and supports intact" },
          { id: "lighting_working", label: "Case lighting operational" },
          { id: "price_rail", label: "Price rail/label holders intact" },
          { id: "night_curtain", label: "Night cover/energy curtain functioning (if equipped)" },
          { id: "no_sweating", label: "No condensation/sweating on exterior surfaces" }
        ],
        notesField: true
      },
      {
        id: "recommended_actions",
        title: "Recommended Actions",
        type: "checklist",
        items: [
          { id: "action_none", label: "No action needed - all items pass" },
          { id: "action_evap", label: "Evaporator coil cleaning needed" },
          { id: "action_refrigerant", label: "Refrigerant charge adjustment or leak repair needed" },
          { id: "action_misting", label: "Misting/humidity system service needed" },
          { id: "action_drain", label: "Drain system cleaning or repair needed" },
          { id: "action_controller", label: "Case controller or sensor replacement needed" },
          { id: "action_txv", label: "TXV/metering device service needed" },
          { id: "action_airflow", label: "Air curtain/airflow restoration needed" },
          { id: "action_other", label: "Other (see notes)" }
        ],
        extraFields: [
          {
            id: "priority",
            type: "radio",
            label: "Priority Level",
            options: ["Low", "Medium", "High", "Critical"]
          }
        ],
        notesField: true
      }
    ]
  },

  // ============================================
  // HVAC - UNIT HEATERS
  // ============================================

  unit_heater: {
    name: "Unit Heater",
    icon: "\uD83D\uDD25",
    sections: [
      {
        id: "identification",
        title: "Unit Identification & Mounting",
        type: "checklist",
        items: [
          { id: "nameplate_legible", label: "Manufacturer nameplate legible" },
          { id: "mounting_secure", label: "Mounting brackets/hangers secure and intact" },
          { id: "hardware_tight", label: "All mounting hardware tight (no vibration loosening)" },
          { id: "clearances_ok", label: "Clearances to combustibles per manufacturer specs" },
          { id: "vibration_isolators", label: "Vibration isolators present and in good condition" },
          { id: "no_corrosion", label: "No significant corrosion on cabinet or supports" }
        ],
        extraFields: [
          { id: "model_number", type: "text", label: "Model Number" },
          { id: "serial_number", type: "text", label: "Serial Number" },
          { id: "btu_rating", type: "text", label: "BTU Rating" },
          { id: "fuel_type", type: "text", label: "Fuel Type (Gas/Electric)" }
        ],
        notesField: true
      },
      {
        id: "gas_supply",
        title: "Gas Supply & Piping (Gas-Fired)",
        type: "checklist",
        items: [
          { id: "shutoff_accessible", label: "Manual gas shutoff valve accessible and operable" },
          { id: "piping_condition", label: "Gas piping free of corrosion, damage, or improper support" },
          { id: "no_gas_leaks", label: "No gas leaks detected (electronic/soap bubble test)" },
          { id: "drip_leg", label: "Drip leg/sediment trap present at unit" },
          { id: "flex_connector", label: "Flex connector in good condition (if equipped)" },
          { id: "regulator_ok", label: "Gas pressure regulator functioning properly" },
          { id: "manifold_pressure", label: "Manifold pressure within spec" }
        ],
        extraFields: [
          { id: "inlet_pressure", type: "text", label: "Inlet Gas Pressure (in. W.C.)" },
          { id: "manifold_pressure_reading", type: "text", label: "Manifold Pressure (in. W.C.)" }
        ],
        notesField: true
      },
      {
        id: "burner_ignition",
        title: "Burner & Ignition System (Gas-Fired)",
        type: "checklist",
        items: [
          { id: "burner_clean", label: "Burner ports clean, free of debris or blockage" },
          { id: "flame_pattern", label: "Flame pattern even, blue, no lifting or impingement" },
          { id: "pilot_hsi", label: "Pilot/hot surface igniter (HSI) in good condition" },
          { id: "ignition_sequence", label: "Reliable light-off within trial-for-ignition period" },
          { id: "flame_sensor", label: "Flame sensor/thermocouple operating properly" },
          { id: "heat_exchanger", label: "Heat exchanger free of cracks, holes, rust, or soot" },
          { id: "combustion_air", label: "Combustion air openings unobstructed" },
          { id: "gas_valve", label: "Gas valve operating properly, no leaks" }
        ],
        extraFields: [
          { id: "flame_sensor_ua", type: "text", label: "Flame Sensor Signal (\u00B5A)" },
          { id: "co_flue_ppm", type: "text", label: "CO in Flue (ppm)" }
        ],
        notesField: true
      },
      {
        id: "venting",
        title: "Venting & Exhaust (Gas-Fired)",
        type: "checklist",
        items: [
          { id: "vent_pipe_condition", label: "Vent connector/flue pipe free of corrosion or separation" },
          { id: "vent_slope", label: "Proper vent pipe pitch toward termination" },
          { id: "vent_material", label: "Vent pipe material matches appliance category" },
          { id: "termination_clear", label: "Vent termination cap free of blockage" },
          { id: "joints_secure", label: "All vent joints securely connected and fastened" },
          { id: "clearance_combustibles", label: "Vent clearance to combustibles adequate" },
          { id: "inducer_motor", label: "Inducer motor operating properly (power-vented units)" },
          { id: "termination_clearances", label: "Vent termination clearances to windows/doors met" }
        ],
        notesField: true
      },
      {
        id: "electrical",
        title: "Electrical Components & Controls",
        type: "checklist",
        items: [
          { id: "proper_voltage", label: "Proper voltage supply at unit disconnect" },
          { id: "disconnect_present", label: "Dedicated disconnect switch present and accessible" },
          { id: "wiring_condition", label: "Wiring free of damage or improper splices" },
          { id: "connections_tight", label: "All wire connections and terminals tight" },
          { id: "grounding_ok", label: "Unit properly grounded" },
          { id: "thermostat_ok", label: "Thermostat cycling unit on and off correctly" },
          { id: "high_limit", label: "High-limit safety switch not bypassed" },
          { id: "fan_limit", label: "Fan limit control operating properly" }
        ],
        extraFields: [
          { id: "supply_voltage", type: "text", label: "Supply Voltage (V)" },
          { id: "motor_amps", type: "text", label: "Motor Amperage (A)" }
        ],
        notesField: true
      },
      {
        id: "fan_blower",
        title: "Fan/Blower Assembly & Air Distribution",
        type: "checklist",
        items: [
          { id: "fan_blades", label: "Fan blades free of damage, buildup, or imbalance" },
          { id: "motor_bearings", label: "Fan motor bearings quiet, no excessive play" },
          { id: "bearings_lubed", label: "Motor bearings lubricated (per schedule)" },
          { id: "fan_belt", label: "Fan belt condition and tension good (if belt-driven)" },
          { id: "motor_mount", label: "Motor mount and fan housing secure" },
          { id: "rotation_correct", label: "Fan rotation direction correct" },
          { id: "discharge_temp", label: "Discharge air temperature at outlet appropriate" },
          { id: "louvers_operate", label: "Louvers/directional vanes operate freely" },
          { id: "no_obstructions", label: "No obstructions to airflow within clearance zone" }
        ],
        extraFields: [
          { id: "discharge_air_temp", type: "text", label: "Discharge Air Temp (\u00B0F)" }
        ],
        notesField: true
      },
      {
        id: "recommended_actions",
        title: "Recommended Actions",
        type: "checklist",
        items: [
          { id: "action_none", label: "No action needed - all items pass" },
          { id: "action_heat_exchanger", label: "Heat exchanger repair/replacement needed" },
          { id: "action_burner", label: "Burner cleaning/service needed" },
          { id: "action_ignition", label: "Ignition system repair needed" },
          { id: "action_venting", label: "Venting repair/correction needed" },
          { id: "action_motor", label: "Fan motor service/replacement needed" },
          { id: "action_gas_valve", label: "Gas valve replacement needed" },
          { id: "action_controls", label: "Controls/thermostat service needed" },
          { id: "action_other", label: "Other (see notes)" }
        ],
        extraFields: [
          {
            id: "heater_type",
            type: "radio",
            label: "Heater Type",
            options: ["Gas-Fired", "Electric", "Hydronic"]
          },
          {
            id: "priority",
            type: "radio",
            label: "Priority Level",
            options: ["Low", "Medium", "High", "Critical"]
          }
        ],
        notesField: true
      }
    ]
  },

  // ============================================
  // WAREHOUSE & MATERIAL HANDLING EQUIPMENT
  // ============================================

  forklift: {
    name: "Forklift",
    icon: "\uD83D\uDE9C",
    sections: [
      {
        id: "forks_mast",
        title: "Forks, Mast & Lift Mechanism",
        type: "checklist",
        items: [
          { id: "fork_thickness", label: "Fork blade thickness within 90% of original (not worn beyond 10%)" },
          { id: "fork_tips", label: "Fork tips equal height and straight" },
          { id: "fork_heels", label: "Fork heel area free of cracks" },
          { id: "fork_angle", label: "Fork heel angle not exceeding 93 degrees" },
          { id: "locking_pins", label: "Fork locking pins and retaining clips functional" },
          { id: "mast_channels", label: "Mast channels free of cracks, scoring, or corrosion" },
          { id: "mast_rollers", label: "Mast rollers free of wear, flat spots, or excessive play" },
          { id: "lift_chains", label: "Lift chains free of stretch, wear, kinks (chain gauge verified)" },
          { id: "chain_tension", label: "Equal chain tension on both sides" },
          { id: "carriage_rollers", label: "Carriage rollers operating properly" },
          { id: "backrest", label: "Load backrest free of cracks or broken welds" }
        ],
        extraFields: [
          { id: "fork_thickness_reading", type: "text", label: "Fork Blade Thickness (inches)" },
          { id: "chain_stretch", type: "text", label: "Chain Stretch Measurement" }
        ],
        notesField: true
      },
      {
        id: "hydraulic",
        title: "Hydraulic System",
        type: "checklist",
        items: [
          { id: "fluid_level", label: "Hydraulic fluid level correct" },
          { id: "fluid_condition", label: "Hydraulic fluid clean (no contamination)" },
          { id: "cylinders_ok", label: "Lift cylinder(s) free of rod scoring, seal leaks" },
          { id: "tilt_cylinders", label: "Tilt cylinder(s) operating properly" },
          { id: "hoses_condition", label: "All hydraulic hoses free of cracks, bulges, leaks" },
          { id: "fittings_tight", label: "All hydraulic fittings tight, leak-free" },
          { id: "pump_quiet", label: "Hydraulic pump free of unusual noise or vibration" },
          { id: "no_drift", label: "No hydraulic drift (forks hold position under load)" },
          { id: "control_valves", label: "Control valves responsive and not sticking" }
        ],
        extraFields: [
          { id: "hydraulic_fluid_level", type: "text", label: "Hydraulic Fluid Level" }
        ],
        notesField: true
      },
      {
        id: "battery_electrical",
        title: "Battery & Electrical (Electric Units)",
        type: "checklist",
        items: [
          { id: "battery_voltage", label: "Battery voltage at rest and under load within spec" },
          { id: "cell_gravity", label: "Battery specific gravity consistent across cells" },
          { id: "water_levels", label: "Battery water levels adequate in all cells" },
          { id: "battery_case", label: "Battery case free of cracks, leaks, or swelling" },
          { id: "cable_connections", label: "Battery cable connections tight, corrosion-free" },
          { id: "connector_plug", label: "Battery connector/plug free of burned or pitted contacts" },
          { id: "hold_down", label: "Battery hold-down/restraint strap secure" },
          { id: "discharge_indicator", label: "Battery discharge indicator/gauge accurate" },
          { id: "charger_condition", label: "Charger plug, cord, and receptacle undamaged" }
        ],
        extraFields: [
          { id: "battery_voltage_reading", type: "text", label: "Battery Voltage (V)" },
          { id: "specific_gravity", type: "text", label: "Specific Gravity Reading" }
        ],
        notesField: true
      },
      {
        id: "propane_engine",
        title: "Propane/Engine (LPG/IC Units)",
        type: "checklist",
        items: [
          { id: "lpg_tank", label: "LPG tank free of dents, rust, hydro-test date valid" },
          { id: "tank_bracket", label: "Tank mounting bracket and locator pin secure" },
          { id: "fuel_hose", label: "Fuel hose and quick-disconnect free of cracks/leaks" },
          { id: "fuel_gauge", label: "Fuel gauge operating" },
          { id: "regulator", label: "Regulator/vaporizer free of leaks" },
          { id: "engine_oil", label: "Engine oil level adequate" },
          { id: "coolant_level", label: "Coolant level and condition good" },
          { id: "air_filter", label: "Air filter condition acceptable" },
          { id: "exhaust_system", label: "Exhaust system free of leaks or excessive emissions" },
          { id: "co_levels", label: "CO levels within limits (<50 ppm at operator zone)" }
        ],
        extraFields: [
          { id: "co_reading", type: "text", label: "CO Reading (ppm)" },
          { id: "oil_level", type: "text", label: "Engine Oil Level" }
        ],
        notesField: true
      },
      {
        id: "tires_wheels",
        title: "Tires & Wheels",
        type: "checklist",
        items: [
          { id: "drive_tires", label: "Drive tires free of excessive wear, chunking, flat spots" },
          { id: "steer_tires", label: "Steer tires in good condition" },
          { id: "tire_pressure", label: "Pneumatic tire pressure correct (if applicable)" },
          { id: "lug_nuts", label: "All lug nuts/wheel hardware tight" },
          { id: "tire_wear_even", label: "Even tire wear pattern" },
          { id: "no_bond_separation", label: "No rubber bond separation on solid tires" }
        ],
        extraFields: [
          { id: "tire_tread_depth", type: "text", label: "Tire Tread Depth" }
        ],
        notesField: true
      },
      {
        id: "brakes_steering",
        title: "Brakes & Steering",
        type: "checklist",
        items: [
          { id: "service_brake", label: "Service brake stops forklift effectively" },
          { id: "parking_brake", label: "Parking brake holds on rated grade" },
          { id: "brake_pedal", label: "Brake pedal firm, no excessive travel" },
          { id: "steering_response", label: "Steering responsive, no excessive play" },
          { id: "steering_cylinder", label: "Steering cylinder free of leaks" },
          { id: "horn_working", label: "Horn operational" }
        ],
        notesField: true
      },
      {
        id: "safety_operational",
        title: "Safety & Operational",
        type: "checklist",
        items: [
          { id: "overhead_guard", label: "Overhead guard secure, free of cracks or damage" },
          { id: "seatbelt", label: "Seatbelt functional and in good condition" },
          { id: "headlights", label: "Headlights, tail lights, brake lights operational" },
          { id: "strobe_lights", label: "Strobe/warning lights operational" },
          { id: "backup_alarm", label: "Backup alarm operational (if equipped)" },
          { id: "gauges_working", label: "All dashboard gauges and indicator lights functional" },
          { id: "seat_switch", label: "Seat switch/operator presence switch functional" },
          { id: "capacity_plate", label: "Load capacity plate present and legible" },
          { id: "fire_extinguisher", label: "Fire extinguisher mounted, charged, current" }
        ],
        extraFields: [
          { id: "hour_meter", type: "text", label: "Hour Meter Reading" }
        ],
        notesField: true
      },
      {
        id: "recommended_actions",
        title: "Recommended Actions",
        type: "checklist",
        items: [
          { id: "action_none", label: "No action needed - all items pass" },
          { id: "action_forks", label: "Fork replacement needed (wear limit exceeded)" },
          { id: "action_chains", label: "Lift chain replacement needed" },
          { id: "action_hydraulic", label: "Hydraulic system service needed" },
          { id: "action_battery", label: "Battery service/replacement needed" },
          { id: "action_brakes", label: "Brake service needed" },
          { id: "action_tires", label: "Tire replacement needed" },
          { id: "action_mast", label: "Mast/carriage repair needed" },
          { id: "action_other", label: "Other (see notes)" }
        ],
        extraFields: [
          {
            id: "forklift_type",
            type: "radio",
            label: "Power Type",
            options: ["Electric", "LPG/Propane", "Diesel"]
          },
          {
            id: "priority",
            type: "radio",
            label: "Priority Level",
            options: ["Low", "Medium", "High", "Critical"]
          }
        ],
        notesField: true
      }
    ]
  },

  power_jack: {
    name: "Power Jack (Electric Pallet Jack)",
    icon: "\uD83D\uDCE6",
    sections: [
      {
        id: "battery_electrical",
        title: "Battery & Electrical System",
        type: "checklist",
        items: [
          { id: "battery_voltage", label: "Battery voltage at rest and under load within spec" },
          { id: "cell_gravity", label: "Battery specific gravity consistent across cells" },
          { id: "water_levels", label: "Battery water levels adequate in all cells" },
          { id: "battery_case", label: "Battery case free of cracks, leaks, or swelling" },
          { id: "cable_connections", label: "Battery cable connections tight, corrosion-free" },
          { id: "connector_plug", label: "Battery connector/plug free of burned contacts" },
          { id: "hold_down", label: "Battery hold-down/restraint strap secure" },
          { id: "discharge_indicator", label: "Battery discharge indicator/gauge accurate" },
          { id: "charger_condition", label: "Charger plug, cord, and receptacle undamaged" }
        ],
        extraFields: [
          { id: "battery_voltage_reading", type: "text", label: "Battery Voltage (V)" },
          { id: "specific_gravity", type: "text", label: "Specific Gravity Reading" }
        ],
        notesField: true
      },
      {
        id: "drive_controls",
        title: "Drive System & Controls",
        type: "checklist",
        items: [
          { id: "drive_motor", label: "Drive motor free of unusual noise or overheating" },
          { id: "motor_brushes", label: "Drive motor brushes adequate (if brush-type)" },
          { id: "controller_ok", label: "Motor controller/contactor free of damage" },
          { id: "throttle_smooth", label: "Throttle/speed control smooth acceleration/deceleration" },
          { id: "forward_reverse", label: "Forward and reverse operation functional" },
          { id: "creep_speed", label: "Creep speed/turtle mode functional (if equipped)" },
          { id: "tiller_arm", label: "Tiller arm/handle free of cracks or excessive play" },
          { id: "tiller_return", label: "Tiller arm return-to-center and auto-brake functional" },
          { id: "tiller_switches", label: "Tiller arm micro-switches and potentiometer operational" },
          { id: "horn_button", label: "Horn button on tiller handle functional" }
        ],
        extraFields: [
          { id: "brush_length", type: "text", label: "Motor Brush Length Remaining" }
        ],
        notesField: true
      },
      {
        id: "hydraulic",
        title: "Hydraulic System",
        type: "checklist",
        items: [
          { id: "fluid_level", label: "Hydraulic fluid level adequate" },
          { id: "pump_motor", label: "Hydraulic pump motor free of unusual noise" },
          { id: "hoses_fittings", label: "Hydraulic hoses and fittings leak-free" },
          { id: "lift_cylinders", label: "Lift cylinder(s) free of rod scoring or seal leaks" },
          { id: "lift_smooth", label: "Forks raise and lower smoothly without jerking" },
          { id: "lowering_valve", label: "Lowering speed control valve operating properly" },
          { id: "no_drift", label: "No hydraulic drift (forks hold under load)" }
        ],
        extraFields: [
          { id: "hydraulic_level", type: "text", label: "Hydraulic Fluid Level" }
        ],
        notesField: true
      },
      {
        id: "wheels_forks",
        title: "Wheels & Forks",
        type: "checklist",
        items: [
          { id: "drive_wheel", label: "Drive wheel free of wear, chunking, flat spots" },
          { id: "load_rollers", label: "Load rollers (caster wheels) free of wear, rotate freely" },
          { id: "steer_bearings", label: "Steer wheel bearings free of play or noise" },
          { id: "roller_axles", label: "Load roller axles and bearings free of wear" },
          { id: "fork_blades", label: "Fork blades free of bends, cracks, or excessive wear" },
          { id: "entry_rollers", label: "Fork entry rollers rotate freely" },
          { id: "width_adjust", label: "Fork width adjustment mechanism functional (if equipped)" }
        ],
        notesField: true
      },
      {
        id: "brakes_safety",
        title: "Brakes & Safety Systems",
        type: "checklist",
        items: [
          { id: "regen_braking", label: "Electromagnetic/regenerative braking stops unit promptly" },
          { id: "parking_brake", label: "Manual/parking brake engaging and holding" },
          { id: "belly_button", label: "Belly button/reversing switch functional (dead-man)" },
          { id: "emergency_disconnect", label: "Emergency disconnect/kill switch functional" },
          { id: "horn_working", label: "Horn audibly operational" },
          { id: "warning_decals", label: "All warning decals and load capacity plate legible" },
          { id: "speed_reduction", label: "Speed reduction in turns functional (if equipped)" }
        ],
        extraFields: [
          { id: "hour_meter", type: "text", label: "Hour Meter Reading" }
        ],
        notesField: true
      },
      {
        id: "structural",
        title: "Structural & General",
        type: "checklist",
        items: [
          { id: "frame_condition", label: "Frame free of cracks, bends, or weld fractures" },
          { id: "covers_secure", label: "All covers and access panels securely mounted" },
          { id: "key_switch", label: "Key switch/access control functional" },
          { id: "wiring_harness", label: "Wiring harness free of chafing or exposed wires" },
          { id: "lighting", label: "Lighting (headlights, warning lights) operational" },
          { id: "tiller_pivot", label: "Tiller arm pivot pins and bushings free of wear" }
        ],
        notesField: true
      },
      {
        id: "recommended_actions",
        title: "Recommended Actions",
        type: "checklist",
        items: [
          { id: "action_none", label: "No action needed - all items pass" },
          { id: "action_battery", label: "Battery service/replacement needed" },
          { id: "action_drive_motor", label: "Drive motor service needed" },
          { id: "action_hydraulic", label: "Hydraulic system service needed" },
          { id: "action_wheels", label: "Wheel/roller replacement needed" },
          { id: "action_brakes", label: "Brake system service needed" },
          { id: "action_tiller", label: "Tiller arm repair needed" },
          { id: "action_other", label: "Other (see notes)" }
        ],
        extraFields: [
          {
            id: "priority",
            type: "radio",
            label: "Priority Level",
            options: ["Low", "Medium", "High", "Critical"]
          }
        ],
        notesField: true
      }
    ]
  },

  straddle_stacker: {
    name: "Electric Straddle Stacker",
    icon: "\uD83D\uDCE6",
    sections: [
      {
        id: "battery_electrical",
        title: "Battery & Electrical System",
        type: "checklist",
        items: [
          { id: "battery_voltage", label: "Battery voltage at rest and under load within spec" },
          { id: "cell_gravity", label: "Battery specific gravity consistent across cells" },
          { id: "water_levels", label: "Battery water levels adequate in all cells" },
          { id: "battery_case", label: "Battery case free of cracks, leaks, or swelling" },
          { id: "cable_connections", label: "Battery cables and connectors tight, corrosion-free" },
          { id: "hold_down", label: "Battery hold-down clamp and roller lock secure" },
          { id: "discharge_indicator", label: "Battery discharge indicator (BDI) accurate" },
          { id: "charger_interlock", label: "Charger interlock prevents drive/lift while charging" },
          { id: "fuse_breaker", label: "Main fuse/circuit breaker in good condition" }
        ],
        extraFields: [
          { id: "battery_voltage_reading", type: "text", label: "Battery Voltage (V)" },
          { id: "specific_gravity", type: "text", label: "Specific Gravity Reading" }
        ],
        notesField: true
      },
      {
        id: "mast_hydraulic",
        title: "Mast & Hydraulic System",
        type: "checklist",
        items: [
          { id: "mast_channels", label: "Mast channels free of cracks, scoring, or corrosion" },
          { id: "mast_rollers", label: "Mast rollers free of wear, flat spots, or play" },
          { id: "lift_chains", label: "Lift chains free of stretch, wear, kinks (gauge verified)" },
          { id: "chain_tension", label: "Equal chain tension on both sides" },
          { id: "lift_cylinders", label: "Lift cylinder(s) free of rod scoring or seal leaks" },
          { id: "hoses_fittings", label: "Hydraulic hoses and fittings leak-free" },
          { id: "fluid_level", label: "Hydraulic fluid level adequate" },
          { id: "pump_ok", label: "Hydraulic pump free of unusual noise or vibration" },
          { id: "mast_operation", label: "Mast raises/lowers smoothly, no hesitation" },
          { id: "no_drift", label: "No hydraulic drift (forks hold under load)" },
          { id: "mast_bolts", label: "Mast mounting bolts tight" }
        ],
        extraFields: [
          { id: "hydraulic_level", type: "text", label: "Hydraulic Fluid Level" },
          { id: "lift_cycle_time", type: "text", label: "Lift Cycle Time (seconds)" }
        ],
        notesField: true
      },
      {
        id: "forks_carriage",
        title: "Forks, Carriage & Load Handling",
        type: "checklist",
        items: [
          { id: "fork_thickness", label: "Fork blade thickness within 90% of original" },
          { id: "fork_tips", label: "Fork tips equal height and straight" },
          { id: "fork_heels", label: "Fork heel area free of cracks" },
          { id: "carriage_rollers", label: "Carriage rollers operating properly" },
          { id: "width_adjust", label: "Fork width/straddle leg adjustment functional" },
          { id: "backrest", label: "Load backrest free of cracks or broken welds" },
          { id: "tilt_function", label: "Fork tilt function smooth (if equipped)" },
          { id: "capacity_plate", label: "Load capacity plate present, legible, correct" }
        ],
        extraFields: [
          { id: "fork_thickness_reading", type: "text", label: "Fork Blade Thickness (inches)" }
        ],
        notesField: true
      },
      {
        id: "straddle_legs",
        title: "Straddle Legs & Frame",
        type: "checklist",
        items: [
          { id: "legs_condition", label: "Straddle legs free of cracks, bends, or weld fractures" },
          { id: "leg_adjustment", label: "Leg adjustment mechanism functional and locking" },
          { id: "leg_wheels", label: "Straddle leg wheels/rollers free of wear or flat spots" },
          { id: "leg_bearings", label: "Straddle leg wheel bearings free of play or noise" },
          { id: "frame_condition", label: "Frame free of cracks, corrosion, or structural damage" },
          { id: "covers_secure", label: "All body panels and covers securely mounted" },
          { id: "floor_plate", label: "Floor plate/operator platform undamaged (ride-on)" }
        ],
        notesField: true
      },
      {
        id: "drive_controls",
        title: "Drive System & Controls",
        type: "checklist",
        items: [
          { id: "drive_motor", label: "Drive motor free of unusual noise or overheating" },
          { id: "motor_brushes", label: "Motor brushes adequate (if brush-type)" },
          { id: "controller_ok", label: "Motor controller free of errors or loose connections" },
          { id: "throttle_smooth", label: "Throttle/speed control smooth in both directions" },
          { id: "creep_speed", label: "Creep speed function operational" },
          { id: "tiller_steering", label: "Tiller arm/steering responsive and auto-centering" },
          { id: "tiller_condition", label: "Tiller arm free of cracks, play, switch issues" }
        ],
        extraFields: [
          { id: "brush_length", type: "text", label: "Motor Brush Length Remaining" }
        ],
        notesField: true
      },
      {
        id: "brakes_safety",
        title: "Brakes & Safety Systems",
        type: "checklist",
        items: [
          { id: "regen_braking", label: "Electromagnetic/regenerative braking stops promptly" },
          { id: "parking_brake", label: "Parking brake holds on rated grade" },
          { id: "emergency_disconnect", label: "Emergency power disconnect/kill switch functional" },
          { id: "belly_button", label: "Belly button/reversing switch functional (walk-behind)" },
          { id: "horn_working", label: "Horn audibly operational" },
          { id: "backup_alarm", label: "Backup alarm operational (ride-on)" },
          { id: "operator_presence", label: "Operator presence system functional" },
          { id: "overhead_guard", label: "Overhead guard intact and secure (if equipped)" },
          { id: "warning_decals", label: "All warning decals and safety labels legible" }
        ],
        extraFields: [
          { id: "hour_meter", type: "text", label: "Hour Meter Reading" }
        ],
        notesField: true
      },
      {
        id: "tires",
        title: "Wheels & Tires",
        type: "checklist",
        items: [
          { id: "drive_tire", label: "Drive tire(s) free of wear, chunking, or flat spots" },
          { id: "steer_wheel", label: "Steer wheel in good condition" },
          { id: "load_rollers", label: "Straddle leg load rollers free of wear, rotate freely" },
          { id: "wheel_bearings", label: "All wheel bearings free of play or noise" },
          { id: "wheel_hardware", label: "All wheel hardware tight" }
        ],
        extraFields: [
          { id: "tire_tread_depth", type: "text", label: "Tire Tread Depth" }
        ],
        notesField: true
      },
      {
        id: "recommended_actions",
        title: "Recommended Actions",
        type: "checklist",
        items: [
          { id: "action_none", label: "No action needed - all items pass" },
          { id: "action_battery", label: "Battery service/replacement needed" },
          { id: "action_mast", label: "Mast/chain service needed" },
          { id: "action_hydraulic", label: "Hydraulic system service needed" },
          { id: "action_forks", label: "Fork replacement needed" },
          { id: "action_drive", label: "Drive motor/controller service needed" },
          { id: "action_brakes", label: "Brake system service needed" },
          { id: "action_legs", label: "Straddle leg repair needed" },
          { id: "action_other", label: "Other (see notes)" }
        ],
        extraFields: [
          {
            id: "stacker_type",
            type: "radio",
            label: "Unit Type",
            options: ["Walk-Behind", "Ride-On"]
          },
          {
            id: "priority",
            type: "radio",
            label: "Priority Level",
            options: ["Low", "Medium", "High", "Critical"]
          }
        ],
        notesField: true
      }
    ]
  },

  // ============================================
  // INDUSTRIAL EQUIPMENT
  // ============================================

  cardboard_baler: {
    name: "Cardboard Baler",
    icon: "\uD83D\uDCE6",
    sections: [
      {
        id: "hydraulic",
        title: "Hydraulic System",
        type: "checklist",
        items: [
          { id: "fluid_level", label: "Hydraulic fluid level adequate" },
          { id: "fluid_condition", label: "Hydraulic fluid clean (no discoloration/contamination)" },
          { id: "filter_condition", label: "Hydraulic oil filter condition acceptable" },
          { id: "hoses_condition", label: "All hydraulic hoses free of cracks, bulges, leaks" },
          { id: "fittings_tight", label: "All hydraulic fittings tight, leak-free" },
          { id: "cylinder_ok", label: "Main cylinder free of rod scoring, seal leaks, or drift" },
          { id: "cylinder_pins", label: "Cylinder pin, clevis, mounting bolts secure" },
          { id: "pump_ok", label: "Hydraulic pump free of unusual noise or vibration" },
          { id: "relief_valve", label: "Pressure relief valve operational at factory-set max" },
          { id: "return_filter", label: "Return filter and suction strainer acceptable" }
        ],
        extraFields: [
          { id: "hydraulic_pressure", type: "text", label: "System Pressure (PSI)" },
          { id: "fluid_temp", type: "text", label: "Hydraulic Fluid Temp (\u00B0F)" },
          { id: "hydraulic_level", type: "text", label: "Fluid Level" }
        ],
        notesField: true
      },
      {
        id: "platen_chamber",
        title: "Platen & Compression Chamber",
        type: "checklist",
        items: [
          { id: "platen_condition", label: "Platen (ram face) free of cracks or deformation" },
          { id: "platen_secured", label: "Platen securely pinned/bolted to cylinder rod" },
          { id: "guide_shoes", label: "Platen guide shoes/wear strips within tolerance" },
          { id: "chamber_walls", label: "Chamber walls free of cracks, bulging, or damage" },
          { id: "chamber_floor", label: "Chamber floor and ceiling free of wear" },
          { id: "platen_seals", label: "Platen seals/scrapers properly contacting" },
          { id: "debris_clear", label: "Platen travel area and guide channels clean" },
          { id: "full_stroke", label: "Full platen stroke length achieved, no short-stroking" }
        ],
        notesField: true
      },
      {
        id: "safety_interlocks",
        title: "Safety Interlocks & Controls (ANSI Z245.5)",
        type: "checklist",
        items: [
          { id: "door_interlock", label: "Feed door interlock - baler won't operate with door open" },
          { id: "door_gap", label: "Feed door interlock gap does not exceed 1/2 inch" },
          { id: "emergency_stop", label: "Emergency stop button(s) functional and accessible" },
          { id: "estop_type", label: "E-stop buttons are red mushroom-head, clearly labeled" },
          { id: "power_disconnect", label: "Main power disconnect/lockout-tagout capable" },
          { id: "no_bypass", label: "No interlock switches tampered with or bypassed" },
          { id: "guards_in_place", label: "All safety guards and point-of-operation guarding in place" },
          { id: "safety_decals", label: "Safety decals and warning labels present and legible" },
          { id: "door_latch", label: "Door latch mechanism operates and holds during compression" },
          { id: "limit_switches", label: "Auto-cycle stop/limit switches functional" }
        ],
        notesField: true
      },
      {
        id: "wire_tie",
        title: "Wire Tie / Banding System",
        type: "checklist",
        items: [
          { id: "threading_mechanism", label: "Wire/twine threading mechanism functional (auto-tie)" },
          { id: "wire_supply", label: "Wire/twine supply adequate and in good condition" },
          { id: "cutters_sharp", label: "Wire cutters/knives sharp and aligned" },
          { id: "twisters_ok", label: "Wire twisters/knotters operating properly" },
          { id: "ejection_door", label: "Bale ejection door mechanism and latches functional" },
          { id: "bale_channel", label: "Bale channel/exit area clear and unobstructed" },
          { id: "tie_slots", label: "Tie slot/needle guides free of wear or damage" }
        ],
        notesField: true
      },
      {
        id: "electrical",
        title: "Electrical System",
        type: "checklist",
        items: [
          { id: "panel_condition", label: "Main electrical panel free of loose connections" },
          { id: "motor_ok", label: "Motor free of unusual noise, vibration, or overheating" },
          { id: "starter_contactor", label: "Motor starter/contactor free of pitting or arcing" },
          { id: "conduit_ok", label: "All conduit and junction boxes undamaged" },
          { id: "enclosures_sealed", label: "All electrical enclosures properly closed and sealed" },
          { id: "controls_ok", label: "All indicator lights and control panel switches operational" }
        ],
        extraFields: [
          { id: "motor_amps", type: "text", label: "Motor Amps Under Load" },
          { id: "supply_voltage", type: "text", label: "Supply Voltage (V)" }
        ],
        notesField: true
      },
      {
        id: "structural",
        title: "Structural & General",
        type: "checklist",
        items: [
          { id: "frame_welds", label: "Main frame and welds free of cracks or corrosion" },
          { id: "anchor_bolts", label: "Anchor bolts and floor mounting secure" },
          { id: "door_hinges", label: "Door hinges, pins, and pivot points free of wear" },
          { id: "lubrication", label: "All grease fittings lubricated per schedule" },
          { id: "chamber_clean", label: "Baler chamber clean, free of material buildup" },
          { id: "loading_area", label: "Loading area and surrounding floor free of hazards" },
          { id: "baler_level", label: "Baler level and stable" }
        ],
        extraFields: [
          { id: "cycle_counter", type: "text", label: "Cycle Counter / Hour Meter" }
        ],
        notesField: true
      },
      {
        id: "recommended_actions",
        title: "Recommended Actions",
        type: "checklist",
        items: [
          { id: "action_none", label: "No action needed - all items pass" },
          { id: "action_hydraulic", label: "Hydraulic system service needed" },
          { id: "action_cylinder", label: "Cylinder seal/repair needed" },
          { id: "action_interlocks", label: "Safety interlock repair needed" },
          { id: "action_wire", label: "Wire tie system service needed" },
          { id: "action_motor", label: "Motor/electrical service needed" },
          { id: "action_platen", label: "Platen/guide shoe replacement needed" },
          { id: "action_other", label: "Other (see notes)" }
        ],
        extraFields: [
          {
            id: "priority",
            type: "radio",
            label: "Priority Level",
            options: ["Low", "Medium", "High", "Critical"]
          }
        ],
        notesField: true
      }
    ]
  },

  trash_compactor: {
    name: "Trash Compactor",
    icon: "\uD83D\uDDD1\uFE0F",
    sections: [
      {
        id: "hydraulic",
        title: "Hydraulic System",
        type: "checklist",
        items: [
          { id: "fluid_level", label: "Hydraulic fluid level adequate" },
          { id: "fluid_condition", label: "Hydraulic fluid clean (no contamination)" },
          { id: "filter_condition", label: "Hydraulic filter condition acceptable" },
          { id: "hoses_condition", label: "All hydraulic hoses free of cracks, bulges, leaks" },
          { id: "fittings_tight", label: "All fittings tight, leak-free" },
          { id: "cylinder_ok", label: "Compaction cylinder free of rod scoring or seal leaks" },
          { id: "cylinder_pins", label: "Cylinder mounting pins and clevises secure" },
          { id: "pump_motor", label: "Hydraulic pump motor free of unusual noise" },
          { id: "relief_valve", label: "Pressure relief valve functional" }
        ],
        extraFields: [
          { id: "hydraulic_pressure", type: "text", label: "System Pressure (PSI)" },
          { id: "fluid_temp", type: "text", label: "Hydraulic Fluid Temp (\u00B0F)" },
          { id: "hydraulic_level", type: "text", label: "Fluid Level" }
        ],
        notesField: true
      },
      {
        id: "chamber_ram",
        title: "Compaction Chamber & Ram",
        type: "checklist",
        items: [
          { id: "ram_condition", label: "Ram/compaction plate free of cracks or deformation" },
          { id: "guide_shoes", label: "Ram guide shoes/wear plates not excessively worn" },
          { id: "chamber_walls", label: "Chamber walls, floor, ceiling free of cracks or bulging" },
          { id: "chamber_drain", label: "Chamber drain free of blockage" },
          { id: "container_hookup", label: "Container connection/hook-up area free of damage" },
          { id: "full_stroke", label: "Ram completes full stroke, no obstructions" },
          { id: "chamber_clean", label: "Compaction chamber clean of debris and buildup" },
          { id: "container_seal", label: "Container seal/gasket at interface intact" }
        ],
        notesField: true
      },
      {
        id: "safety_interlocks",
        title: "Safety Interlocks & Controls (ANSI Z245.2)",
        type: "checklist",
        items: [
          { id: "door_interlock", label: "Charge door interlock - compactor won't operate with door open" },
          { id: "emergency_stop", label: "Emergency stop button(s) functional, all locations" },
          { id: "estop_type", label: "E-stop buttons red mushroom-head, clearly labeled" },
          { id: "power_disconnect", label: "Main power disconnect and LOTO capable" },
          { id: "no_bypass", label: "No interlock switches tampered with or bypassed" },
          { id: "guards_covers", label: "All safety guards and covers in place" },
          { id: "prox_switches", label: "Proximity/limit switches operating properly" },
          { id: "safety_decals", label: "All safety/warning decals and placards legible" },
          { id: "access_control", label: "Key-switch/access control prevents unauthorized operation" }
        ],
        notesField: true
      },
      {
        id: "electrical",
        title: "Electrical System",
        type: "checklist",
        items: [
          { id: "panel_condition", label: "Electrical panel free of loose connections or tripped breakers" },
          { id: "motor_ok", label: "Motor free of unusual noise, vibration, or overheating" },
          { id: "starter_contactor", label: "Motor starter/contactor free of pitting or arcing" },
          { id: "conduit_ok", label: "All conduit, junction boxes, and wiring undamaged" },
          { id: "enclosures_sealed", label: "All electrical enclosures properly sealed" },
          { id: "controls_ok", label: "Control panel switches and indicator lights operational" },
          { id: "auto_cycle", label: "Auto-cycle/timer function operating properly (if equipped)" },
          { id: "level_sensor", label: "Level sensor/full indicator functional (if equipped)" }
        ],
        extraFields: [
          { id: "motor_amps", type: "text", label: "Motor Amps During Compaction" },
          { id: "supply_voltage", type: "text", label: "Supply Voltage (V)" }
        ],
        notesField: true
      },
      {
        id: "charge_door",
        title: "Charge Door & Loading Area",
        type: "checklist",
        items: [
          { id: "door_condition", label: "Charge door free of structural damage or broken welds" },
          { id: "door_hardware", label: "Door hinges, rollers, and tracks in good condition" },
          { id: "door_operation", label: "Door opens and closes smoothly" },
          { id: "door_latch", label: "Door latch/lock mechanism engages properly" },
          { id: "door_seal", label: "Door seal/gasket free of deterioration or leaks" },
          { id: "door_stops", label: "Door stops and bumpers in place" },
          { id: "loading_chute", label: "Loading chute/hopper free of damage (if equipped)" },
          { id: "loading_lighting", label: "Loading area lighting adequate and functional" },
          { id: "loading_area_safe", label: "Loading area free of trip hazards and spills" }
        ],
        notesField: true
      },
      {
        id: "container",
        title: "Container & External Components",
        type: "checklist",
        items: [
          { id: "container_body", label: "Container body free of cracks, corrosion, or bulging" },
          { id: "container_doors", label: "Container doors and latches functional" },
          { id: "container_rollers", label: "Container rollers/wheels operational" },
          { id: "hookup_hardware", label: "Connection hardware secure and engaged" },
          { id: "drain_plug", label: "Container drain plug/valve leak-free" },
          { id: "container_seated", label: "Container properly seated and aligned" },
          { id: "pest_evidence", label: "No pest evidence/infestation around unit" }
        ],
        notesField: true
      },
      {
        id: "recommended_actions",
        title: "Recommended Actions",
        type: "checklist",
        items: [
          { id: "action_none", label: "No action needed - all items pass" },
          { id: "action_hydraulic", label: "Hydraulic system service needed" },
          { id: "action_cylinder", label: "Cylinder seal/repair needed" },
          { id: "action_interlocks", label: "Safety interlock repair needed" },
          { id: "action_door", label: "Charge door repair needed" },
          { id: "action_motor", label: "Motor/electrical service needed" },
          { id: "action_container", label: "Container repair/replacement needed" },
          { id: "action_other", label: "Other (see notes)" }
        ],
        extraFields: [
          {
            id: "priority",
            type: "radio",
            label: "Priority Level",
            options: ["Low", "Medium", "High", "Critical"]
          }
        ],
        notesField: true
      }
    ]
  },

  dock_leveler: {
    name: "Dock Leveler",
    icon: "\uD83D\uDEE0\uFE0F",
    sections: [
      {
        id: "deck_lip",
        title: "Deck & Lip Assembly",
        type: "checklist",
        items: [
          { id: "deck_condition", label: "Deck plate free of cracks, warping, holes, or excessive wear" },
          { id: "deck_thickness", label: "Deck plate thickness adequate in high-wear areas" },
          { id: "lip_condition", label: "Lip plate free of cracks, bending, or edge damage" },
          { id: "lip_hinge_pins", label: "Lip hinge pins free of wear or mushrooming" },
          { id: "lip_springs", label: "Lip return springs and chains intact" },
          { id: "lip_extends", label: "Lip extends fully and transitions smoothly" },
          { id: "lip_keeper", label: "Lip keeper bar/stop functioning properly" },
          { id: "deck_flat", label: "Deck and lip plate flat (no excessive bowing under load)" }
        ],
        extraFields: [
          { id: "deck_thickness_reading", type: "text", label: "Deck Plate Thickness" },
          { id: "lip_thickness_reading", type: "text", label: "Lip Plate Thickness" }
        ],
        notesField: true
      },
      {
        id: "hinges_structure",
        title: "Hinges, Structural & Pit Area",
        type: "checklist",
        items: [
          { id: "rear_hinge_pins", label: "Rear hinge pins free of wear or deformation" },
          { id: "hinge_tubes", label: "Rear hinge tubes/housings free of cracks or corrosion" },
          { id: "stringers", label: "Structural stringers (underneath) free of cracks or bends" },
          { id: "headers", label: "Front and rear headers free of damage or distortion" },
          { id: "cross_members", label: "Cross members and support structure intact" },
          { id: "pit_condition", label: "Pit walls, floor, drainage free of standing water/debris" },
          { id: "pit_clean", label: "Pit area cleaned of all debris and dirt" },
          { id: "curb_steel", label: "Curb steel/angles at pit perimeter undamaged" },
          { id: "weld_joints", label: "All weld joints free of cracks or fractures" }
        ],
        notesField: true
      },
      {
        id: "hydraulic",
        title: "Hydraulic System (Hydraulic Levelers)",
        type: "checklist",
        items: [
          { id: "fluid_level", label: "Hydraulic fluid level adequate" },
          { id: "hoses_pipes", label: "Hydraulic hoses and connections leak-free" },
          { id: "cylinders_ok", label: "Hydraulic cylinder(s) free of rod scoring or seal leaks" },
          { id: "power_unit", label: "Power unit motor free of unusual noise or vibration" },
          { id: "solenoid_valves", label: "Solenoid valves operating properly (raise/lower/lip)" },
          { id: "velocity_fuse", label: "Velocity fuse operational (prevents uncontrolled descent)" },
          { id: "power_unit_mount", label: "Hydraulic power unit securely mounted" },
          { id: "fluid_condition", label: "Hydraulic fluid free of contamination" },
          { id: "manual_release", label: "Manual lowering valve/emergency release functional" }
        ],
        extraFields: [
          { id: "hydraulic_pressure", type: "text", label: "System Pressure (PSI)" },
          { id: "hydraulic_level", type: "text", label: "Fluid Level" }
        ],
        notesField: true
      },
      {
        id: "mechanical",
        title: "Mechanical System (Mechanical Levelers)",
        type: "checklist",
        items: [
          { id: "hold_down_springs", label: "Hold-down springs free of breakage or fatigue" },
          { id: "release_rod", label: "Release rod and linkage free of wear" },
          { id: "walking_beam", label: "Walking beam/rocker mechanism free of wear or binding" },
          { id: "mechanical_release", label: "Pull-chain/pull-rod operates smoothly" },
          { id: "ratchet_mechanism", label: "Ratchet/detent mechanism engages at all positions" },
          { id: "linkage_pins", label: "All linkage pins, clevises, cotter pins present" },
          { id: "lubrication", label: "All pivot points and moving parts lubricated" }
        ],
        notesField: true
      },
      {
        id: "safety_controls",
        title: "Safety & Controls",
        type: "checklist",
        items: [
          { id: "toe_guards", label: "Toe guards present and secure on all exposed pit sides" },
          { id: "run_stop", label: "Run/stop controls functioning properly" },
          { id: "emergency_stop", label: "Emergency stop button functional (if equipped)" },
          { id: "warning_decals", label: "DANGER/CAUTION decals present and legible" },
          { id: "vehicle_restraint", label: "Vehicle restraint/trailer lock interface functional" },
          { id: "dock_light", label: "Dock light/communication light operational" },
          { id: "wiring_ok", label: "All conduit, wiring, and junction boxes undamaged" },
          { id: "loto_capable", label: "Lockout-tagout capability for maintenance" },
          { id: "capacity_plate", label: "Rated capacity plate present and legible" },
          { id: "dock_bumpers", label: "Dock bumpers secure, min 4\" projection remaining" }
        ],
        notesField: true
      },
      {
        id: "operational",
        title: "Operational & Performance",
        type: "checklist",
        items: [
          { id: "full_cycle", label: "Complete cycle: raise, extend lip, lower, return to stored" },
          { id: "no_unusual_sounds", label: "No unusual sounds during operation" },
          { id: "smooth_motion", label: "Smooth, controlled motion throughout range" },
          { id: "lip_engagement", label: "Lip extends fully and engages over trailer bed" },
          { id: "float_test", label: "Leveler floats properly with trailer movement" },
          { id: "height_range", label: "Operation tested at max and min trailer heights" },
          { id: "stored_flush", label: "Leveler returns to stored position and sits flush" },
          { id: "weather_seal", label: "Weather seal/dock seal around perimeter in good condition" }
        ],
        extraFields: [
          { id: "cycle_time", type: "text", label: "Total Cycle Time (seconds)" }
        ],
        notesField: true
      },
      {
        id: "recommended_actions",
        title: "Recommended Actions",
        type: "checklist",
        items: [
          { id: "action_none", label: "No action needed - all items pass" },
          { id: "action_hydraulic", label: "Hydraulic system service needed" },
          { id: "action_springs", label: "Spring/mechanical repair needed" },
          { id: "action_deck_lip", label: "Deck or lip plate repair/replacement needed" },
          { id: "action_hinges", label: "Hinge pin replacement needed" },
          { id: "action_safety", label: "Safety device repair needed" },
          { id: "action_bumpers", label: "Dock bumper replacement needed" },
          { id: "action_seal", label: "Weather seal/dock seal replacement needed" },
          { id: "action_other", label: "Other (see notes)" }
        ],
        extraFields: [
          {
            id: "leveler_type",
            type: "radio",
            label: "Leveler Type",
            options: ["Hydraulic", "Mechanical", "Air-Powered"]
          },
          {
            id: "priority",
            type: "radio",
            label: "Priority Level",
            options: ["Low", "Medium", "High", "Critical"]
          }
        ],
        notesField: true
      }
    ]
  },

  // ============================================
  // GENERAL BUILDING INSPECTIONS
  // ============================================

  building_restaurant: {
    name: "Building Inspection - Restaurant/Cafe",
    icon: "\uD83C\uDFEA",
    sections: [
      {
        id: "ingress_egress",
        title: "Ingress/Egress & Entrance Systems",
        type: "checklist",
        items: [
          { id: "exit_doors_open", label: "All exit doors open freely without excessive force" },
          { id: "doors_swing_egress", label: "Exit doors swing in direction of egress (occupancy >50)" },
          { id: "panic_hardware", label: "All panic hardware/push bars functional" },
          { id: "exit_signage", label: "Exit signage illuminated and visible from egress path" },
          { id: "emergency_lighting", label: "Emergency exit lighting operates on battery backup" },
          { id: "auto_door_openers", label: "Automatic door opener(s) sensors, speed, force OK" },
          { id: "auto_door_safety", label: "Automatic door safety sensors functional" },
          { id: "entry_doors", label: "Primary entry door(s) - closers, hinges, weatherstripping OK" },
          { id: "door_closer_speed", label: "Door closer sweep and latch speeds per ADA" },
          { id: "exit_paths_clear", label: "Exit paths clear, properly marked, min 44\" width" },
          { id: "ada_hardware", label: "Door hardware ADA-compliant (lever/push-type)" },
          { id: "thresholds", label: "Thresholds max 1/2\" height, beveled if over 1/4\"" },
          { id: "door_mats", label: "Door mats flush-set, no trip hazards" }
        ],
        notesField: true
      },
      {
        id: "walls_floors_ceiling",
        title: "Walls, Floors & Ceiling",
        type: "checklist",
        items: [
          { id: "wall_surfaces", label: "Interior wall surfaces free of damage, holes, or peeling" },
          { id: "kitchen_walls", label: "Kitchen/food prep walls smooth, nonabsorbent, washable" },
          { id: "frp_tile", label: "FRP/tile in wet/kitchen areas free of damage or delamination" },
          { id: "floor_cracks", label: "Floor surfaces free of cracks, chips, or trip hazards" },
          { id: "slip_resistant", label: "Slip-resistant flooring in kitchen, bar, restrooms" },
          { id: "floor_transitions", label: "Floor transitions between materials properly leveled" },
          { id: "floor_drains", label: "Floor drains flowing properly, covers in place" },
          { id: "baseboards", label: "Baseboards/cove base free of gaps (pest entry points)" },
          { id: "ceiling_tiles", label: "Ceiling tiles free of stains, sagging, or missing tiles" },
          { id: "ceiling_condition", label: "Exposed ceiling free of rust, flaking, or grease buildup" },
          { id: "kitchen_ceiling_rated", label: "Kitchen ceiling meets fire-rating requirements" },
          { id: "moisture_signs", label: "No evidence of moisture intrusion, mold, or efflorescence" }
        ],
        notesField: true
      },
      {
        id: "windows",
        title: "Windows & Natural Lighting",
        type: "checklist",
        items: [
          { id: "glass_condition", label: "Window glass free of cracks, chips, or fogging" },
          { id: "frames_sills", label: "Window frames, sills, and caulking in good condition" },
          { id: "operable_windows", label: "Operable windows function properly (open, close, lock)" },
          { id: "screens_intact", label: "Window screens free of tears or missing sections" },
          { id: "fire_rated_windows", label: "Windows in fire-rated walls meet requirements" },
          { id: "coverings_ok", label: "Window coverings (blinds, shades) undamaged" },
          { id: "storefront_glazing", label: "Storefront glazing secure with intact gaskets" }
        ],
        notesField: true
      },
      {
        id: "plumbing_restrooms",
        title: "Plumbing Fixtures & Restrooms",
        type: "checklist",
        items: [
          { id: "faucets_working", label: "All faucets operating properly, hot and cold supply" },
          { id: "hot_water_temp", label: "Hot water temperature at handwash sinks adequate" },
          { id: "no_leaks", label: "No leaks at visible supply lines, valves, or drains" },
          { id: "toilets_urinals", label: "Toilets and urinals flush properly, no leaks" },
          { id: "floor_drains", label: "Floor drains present and functional in restrooms/kitchen" },
          { id: "grease_trap", label: "Grease trap/interceptor serviced (record date)" },
          { id: "backflow_prevention", label: "Backflow prevention devices current certification" },
          { id: "handwash_sinks", label: "Kitchen handwash sinks accessible, stocked with soap/towels" },
          { id: "three_comp_sink", label: "Three-compartment sink proper setup and drainage" },
          { id: "water_heater", label: "Water heater temperature setting and condition OK" },
          { id: "drain_pipes", label: "Exposed drain pipes free of leaks, proper slope, P-traps intact" },
          { id: "ada_restroom", label: "ADA-compliant restroom(s) - grab bars, clearances, sink height" },
          { id: "restroom_ventilation", label: "Restroom exhaust fan operational" }
        ],
        extraFields: [
          { id: "hw_temp", type: "text", label: "Hot Water Temp at Handwash (\u00B0F)" },
          { id: "grease_trap_date", type: "text", label: "Grease Trap Last Service Date" }
        ],
        notesField: true
      },
      {
        id: "electrical_lighting",
        title: "Electrical Systems & Lighting",
        type: "checklist",
        items: [
          { id: "panel_labeled", label: "Main electrical panel labeled, accessible, 36\" clearance" },
          { id: "no_open_knockouts", label: "No open knockouts or exposed wiring at panels" },
          { id: "gfci_tested", label: "GFCI outlets tested in kitchen, bar, restrooms, outdoor" },
          { id: "wiring_condition", label: "Visible wiring free of damage or improper splices" },
          { id: "cover_plates", label: "Cover plates on all outlets and switches" },
          { id: "junction_boxes", label: "All junction boxes covered" },
          { id: "dining_lighting", label: "Dining area lighting levels adequate" },
          { id: "kitchen_lighting", label: "Kitchen lighting 50 FC at work surfaces" },
          { id: "exterior_lighting", label: "Exterior lighting operational (parking, signage, entry)" },
          { id: "emergency_lighting_test", label: "Emergency/exit lighting battery backup tested" },
          { id: "fixtures_condition", label: "Light fixtures free of damage, lenses intact" },
          { id: "shatter_resistant", label: "Shatter-resistant light covers in food prep/storage areas" }
        ],
        extraFields: [
          { id: "dining_fc", type: "text", label: "Dining Lighting (foot-candles)" },
          { id: "kitchen_fc", type: "text", label: "Kitchen Lighting (foot-candles)" }
        ],
        notesField: true
      },
      {
        id: "hvac_environmental",
        title: "HVAC Vents & Environmental",
        type: "checklist",
        items: [
          { id: "supply_return_grilles", label: "Supply/return air grilles clean and unobstructed" },
          { id: "exhaust_hood", label: "Kitchen exhaust hood operating and drawing properly" },
          { id: "hood_filters", label: "Kitchen exhaust hood filters clean" },
          { id: "hood_duct_cleaning", label: "Hood/duct cleaning current (NFPA 96)" },
          { id: "makeup_air", label: "Make-up air system operating (where installed)" },
          { id: "dining_comfort", label: "Dining area temperature and comfort acceptable" },
          { id: "ductwork_condition", label: "Visible ductwork free of damage or disconnection" },
          { id: "restroom_exhaust", label: "Restroom exhaust fans operational" },
          { id: "thermostats_ok", label: "Thermostat(s) operating and properly set" },
          { id: "condensate_drains", label: "Condensate drains flowing freely" }
        ],
        extraFields: [
          { id: "dining_temp", type: "text", label: "Dining Area Temp (\u00B0F)" },
          { id: "hood_cleaning_date", type: "text", label: "Last Hood/Duct Cleaning Date" }
        ],
        notesField: true
      },
      {
        id: "fire_safety",
        title: "Fire Safety & Life Safety Systems",
        type: "checklist",
        items: [
          { id: "fire_extinguishers", label: "Fire extinguishers present, accessible, currently tagged" },
          { id: "class_k", label: "Class K extinguisher within 30 ft of cooking appliances" },
          { id: "hood_suppression", label: "Kitchen fire suppression system (Ansul) current inspection" },
          { id: "sprinkler_heads", label: "Sprinkler heads free of paint, damage, or obstructions" },
          { id: "fire_alarm_panel", label: "Fire alarm panel shows normal condition" },
          { id: "smoke_detectors", label: "Smoke/heat detectors tested in accessible areas" },
          { id: "gas_shutoff", label: "Gas shutoff valve labeled, accessible, staff knows location" },
          { id: "fdc_accessible", label: "Fire department connection accessible, caps in place" },
          { id: "occupancy_posted", label: "Posted occupancy limit signage displayed" },
          { id: "fire_doors", label: "Fire-rated doors intact, self-closing, not propped open" },
          { id: "no_combustible_storage", label: "No combustible storage in mechanical/electrical rooms" },
          { id: "address_visible", label: "Address numbers visible from street" }
        ],
        extraFields: [
          { id: "suppression_date", type: "text", label: "Ansul/Suppression Last Inspection" }
        ],
        notesField: true
      },
      {
        id: "ada_general",
        title: "ADA Compliance, Furniture & General",
        type: "checklist",
        items: [
          { id: "accessible_parking", label: "Accessible parking space(s) - quantity, signage, van-accessible" },
          { id: "accessible_route", label: "Accessible route from parking to entrance - slope, width OK" },
          { id: "ramp_compliant", label: "Ramp (if present) proper slope, handrails, edge protection" },
          { id: "accessible_seating", label: "5% of seating accessible (wheelchair space, knee clearance)" },
          { id: "tables_chairs", label: "Tables and chairs stable, undamaged, clean" },
          { id: "booths_condition", label: "Booths/banquettes upholstery and frame in good condition" },
          { id: "counter_lowered", label: "Service counter includes lowered section (max 36\" AFF)" },
          { id: "tactile_signage", label: "Tactile/Braille signage at restrooms and permanent rooms" },
          { id: "pest_evidence", label: "No pest evidence, odors, or waste management issues" },
          { id: "dumpster_area", label: "Dumpster/waste area enclosed, clean, pest-free" },
          { id: "exterior_facade", label: "Exterior building facade, signage, awnings in good condition" },
          { id: "parking_lot", label: "Parking lot/sidewalk free of potholes, cracks, trip hazards" }
        ],
        notesField: true
      },
      {
        id: "recommended_actions",
        title: "Recommended Actions",
        type: "checklist",
        items: [
          { id: "action_none", label: "No action needed - all items pass" },
          { id: "action_egress", label: "Egress/exit repair needed" },
          { id: "action_plumbing", label: "Plumbing repair needed" },
          { id: "action_electrical", label: "Electrical repair needed" },
          { id: "action_hvac", label: "HVAC/ventilation service needed" },
          { id: "action_fire_safety", label: "Fire safety system service needed" },
          { id: "action_ada", label: "ADA compliance correction needed" },
          { id: "action_structural", label: "Structural repair needed (walls, floors, ceiling)" },
          { id: "action_other", label: "Other (see notes)" }
        ],
        extraFields: [
          {
            id: "priority",
            type: "radio",
            label: "Priority Level",
            options: ["Low", "Medium", "High", "Critical"]
          }
        ],
        notesField: true
      }
    ]
  },

  building_grocery_warehouse: {
    name: "Building Inspection - Grocery/Warehouse",
    icon: "\uD83C\uDFED",
    sections: [
      {
        id: "ingress_egress",
        title: "Ingress/Egress & Entrance Systems",
        type: "checklist",
        items: [
          { id: "auto_doors", label: "Automatic entry doors - sensors, speed, closing function OK" },
          { id: "door_tracks", label: "Automatic door guide rails, tracks, rollers in good condition" },
          { id: "door_safety_sensors", label: "Automatic door safety sensors prevent closing on persons" },
          { id: "door_breakout", label: "Automatic door manual breakout capability functional" },
          { id: "door_mats", label: "Door mats recessed, secured, no trip hazards" },
          { id: "exit_doors", label: "All exit doors open without special knowledge/keys" },
          { id: "doors_swing_egress", label: "Exit doors swing in direction of egress (occupancy >50)" },
          { id: "panic_hardware", label: "Panic/fire exit hardware on all required exit doors" },
          { id: "exit_signage", label: "Exit signage illuminated at every required exit" },
          { id: "emergency_lighting", label: "Emergency exit lighting battery backup operational" },
          { id: "exit_path_width", label: "Exit path widths meet minimum (44\" corridors)" },
          { id: "paths_unobstructed", label: "Exit paths clear - no merchandise, carts, or pallets" },
          { id: "vestibule", label: "Entry vestibule - heaters, matting, drainage OK" }
        ],
        notesField: true
      },
      {
        id: "loading_docks",
        title: "Loading Docks & Receiving Areas",
        type: "checklist",
        items: [
          { id: "dock_levelers", label: "Dock levelers operating properly" },
          { id: "dock_bumpers", label: "Dock bumpers secure with adequate cushioning" },
          { id: "dock_seals", label: "Dock seals/shelters free of tears or gaps" },
          { id: "dock_doors", label: "Dock door operation (manual/motorized) functional" },
          { id: "dock_door_safety", label: "Overhead dock door safety features (auto-reverse) working" },
          { id: "dock_plates", label: "Dock plate/board condition and weight rating label present" },
          { id: "dock_lighting", label: "Dock area lighting adequate for safe unloading" },
          { id: "wheel_chocks", label: "Wheel chocks available and in good condition" },
          { id: "dock_surface", label: "Dock area free of trip hazards and damaged concrete" },
          { id: "dock_drains", label: "Dock drain(s) and spill containment functional" },
          { id: "dock_signage", label: "Dock safety signage - weight limits, positioning, pedestrian" },
          { id: "fall_protection", label: "Fall protection when doors open, no trailer (guardrails/chains)" },
          { id: "dock_stairs", label: "Dock stairs and handrails in good condition" }
        ],
        extraFields: [
          { id: "dock_lighting_fc", type: "text", label: "Dock Lighting (foot-candles)" }
        ],
        notesField: true
      },
      {
        id: "walls_floors_ceiling",
        title: "Walls, Floors & Ceiling",
        type: "checklist",
        items: [
          { id: "sales_floor", label: "Sales floor surface free of cracks, chips, or trip hazards" },
          { id: "fridge_floor", label: "Floor in refrigerated/frozen sections free of ice buildup" },
          { id: "warehouse_floor", label: "Warehouse floor free of forklift damage, cracks, spalling" },
          { id: "floor_flatness", label: "Floor flatness adequate in pallet racking areas" },
          { id: "floor_drains", label: "Floor drains in deli, bakery, meat, produce flowing" },
          { id: "wall_condition", label: "Interior wall surfaces free of damage, holes, water stains" },
          { id: "food_prep_walls", label: "Food prep area walls smooth, washable, nonabsorbent" },
          { id: "frp_tile", label: "FRP/tile walls around sinks and wet areas intact" },
          { id: "fire_wall_penetrations", label: "Fire-rated wall penetrations sealed/firestopped" },
          { id: "ceiling_condition", label: "Ceiling tiles/panels free of stains or sagging" },
          { id: "warehouse_structure", label: "Exposed warehouse structure (roof deck, joists) OK" },
          { id: "vapor_barriers", label: "Vapor barriers and insulation in cold areas intact" }
        ],
        notesField: true
      },
      {
        id: "shelving_racking",
        title: "Shelving, Racking & Storage (ANSI/RMI MH16.1)",
        type: "checklist",
        items: [
          { id: "uprights_plumb", label: "Pallet racking uprights plumb (max 1/2\" per 10 ft)" },
          { id: "uprights_condition", label: "Uprights free of dents, bends, tears, or weld failures" },
          { id: "beams_ok", label: "Horizontal beams free of damage or deflection" },
          { id: "safety_clips", label: "All beam safety clips/locks in place and engaged" },
          { id: "capacity_placards", label: "Rack load capacity placards posted and legible" },
          { id: "base_plates", label: "Column base plates and anchor bolts secure" },
          { id: "column_guards", label: "Column guards/protectors at aisle ends intact" },
          { id: "wire_decking", label: "Wire decking or pallet supports in place, undamaged" },
          { id: "sprinkler_clearance", label: "18\" clearance to sprinkler heads maintained" },
          { id: "gondola_stable", label: "Retail gondola shelving stable, level, anchored" },
          { id: "shelf_hardware", label: "Shelf brackets, clips, label strips undamaged" },
          { id: "freezer_shelving", label: "Freezer/cooler shelving free of rust or ice damage" },
          { id: "flue_spaces", label: "Flue spaces maintained in racking per NFPA 13" }
        ],
        extraFields: [
          { id: "rack_plumb", type: "text", label: "Rack Plumb Measurement (inches off)" }
        ],
        notesField: true
      },
      {
        id: "plumbing",
        title: "Plumbing & Water Systems",
        type: "checklist",
        items: [
          { id: "restroom_fixtures", label: "All restroom fixtures operating properly" },
          { id: "no_leaks", label: "No leaks at visible supply lines, valves, or drains" },
          { id: "hot_water_temp", label: "Hot water temperature at handwash sinks adequate" },
          { id: "backflow_prevention", label: "Backflow prevention devices present and certified" },
          { id: "floor_drains", label: "Floor drains in all departments clean, covered" },
          { id: "grease_trap", label: "Grease trap/interceptor serviced (record date)" },
          { id: "mop_sink", label: "Mop sink and janitorial area plumbing OK" },
          { id: "condensate_drains", label: "Condensate drains from refrigeration cases flowing" },
          { id: "sump_pumps", label: "Sump pump(s) operational (if present)" },
          { id: "drinking_fountains", label: "Drinking fountains/bottle fillers operational and clean" },
          { id: "ada_restroom", label: "ADA-compliant restroom - grab bars, clearances, mirror" },
          { id: "water_heater", label: "Water heater condition and temperature setting OK" }
        ],
        extraFields: [
          { id: "hw_temp", type: "text", label: "Hot Water Temp (\u00B0F)" },
          { id: "grease_trap_date", type: "text", label: "Grease Trap Last Service Date" }
        ],
        notesField: true
      },
      {
        id: "electrical_lighting",
        title: "Electrical Systems & Lighting",
        type: "checklist",
        items: [
          { id: "electrical_room", label: "Electrical room clean, dry, 36\" clearance maintained" },
          { id: "panels_labeled", label: "Panel directories current and breakers labeled" },
          { id: "no_open_knockouts", label: "No open knockouts or exposed wiring at panels" },
          { id: "gfci_tested", label: "GFCI outlets tested in restrooms, deli, bakery, meat, outdoor" },
          { id: "wiring_condition", label: "No damage, no permanent use of extension cords" },
          { id: "junction_boxes", label: "All junction boxes covered" },
          { id: "sales_floor_lighting", label: "Sales floor lighting levels adequate (50-100 FC)" },
          { id: "warehouse_lighting", label: "Warehouse lighting adequate (20-30 FC)" },
          { id: "fixtures_condition", label: "All light fixtures free of damage, lenses intact" },
          { id: "shatter_resistant", label: "Shatter-resistant light covers in food areas" },
          { id: "emergency_lighting", label: "Emergency lighting functional on test" },
          { id: "exterior_lighting", label: "Parking lot and exterior lighting operational" },
          { id: "case_lighting", label: "Refrigeration case lighting operational" },
          { id: "exit_signs", label: "Exit signs illuminated at all required locations" }
        ],
        extraFields: [
          { id: "sales_fc", type: "text", label: "Sales Floor Lighting (foot-candles)" },
          { id: "warehouse_fc", type: "text", label: "Warehouse Lighting (foot-candles)" }
        ],
        notesField: true
      },
      {
        id: "hvac_refrigeration",
        title: "HVAC, Refrigeration & Environmental",
        type: "checklist",
        items: [
          { id: "grilles_diffusers", label: "Supply/return grilles clean, undamaged, unobstructed" },
          { id: "sales_temp", label: "Sales floor temperature and humidity acceptable" },
          { id: "walkin_cooler_temp", label: "Walk-in cooler temperature (41\u00B0F or below)" },
          { id: "walkin_freezer_temp", label: "Walk-in freezer temperature (0\u00B0F or below)" },
          { id: "walkin_gaskets", label: "Walk-in cooler/freezer door gaskets, closers, latches OK" },
          { id: "freezer_safety_release", label: "Walk-in freezer interior safety release operates" },
          { id: "display_cases", label: "Refrigeration display cases - temp, gaskets, lighting OK" },
          { id: "rooftop_units", label: "Rooftop units visually OK (no damage, panels secure)" },
          { id: "ductwork", label: "Visible ductwork free of damage or disconnection" },
          { id: "thermostats", label: "Thermostats operational and properly programmed" },
          { id: "condensation", label: "No condensation or ice on refrigeration piping/cases" },
          { id: "exhaust_systems", label: "Exhaust systems in bakery, deli, meat cutting operational" },
          { id: "pipe_insulation", label: "Refrigerant piping insulation intact" }
        ],
        extraFields: [
          { id: "sales_floor_temp", type: "text", label: "Sales Floor Temp (\u00B0F)" },
          { id: "cooler_temp", type: "text", label: "Walk-In Cooler Temp (\u00B0F)" },
          { id: "freezer_temp", type: "text", label: "Walk-In Freezer Temp (\u00B0F)" }
        ],
        notesField: true
      },
      {
        id: "fire_safety",
        title: "Fire Safety & Emergency Systems",
        type: "checklist",
        items: [
          { id: "fire_extinguishers", label: "Fire extinguishers present, accessible, currently tagged" },
          { id: "class_k", label: "Class K extinguisher near cooking equipment (deli, bakery)" },
          { id: "sprinkler_heads", label: "Sprinkler heads free of paint, damage, or obstructions" },
          { id: "sprinkler_clearance", label: "18\" clear space below sprinkler deflectors maintained" },
          { id: "sprinkler_valves", label: "Sprinkler control valves open, sealed/supervised" },
          { id: "fire_alarm_panel", label: "Fire alarm panel shows normal condition" },
          { id: "smoke_heat_detectors", label: "Smoke/heat detectors tested in accessible areas" },
          { id: "fire_doors", label: "Fire-rated doors intact, self-closing, not propped" },
          { id: "fdc_accessible", label: "Fire department connection accessible, knox box functional" },
          { id: "emergency_plan", label: "Emergency action plan posted and current" },
          { id: "occupancy_posted", label: "Occupancy load signage posted" },
          { id: "gas_shutoff", label: "Gas shutoff valve labeled and accessible" },
          { id: "electrical_room_rated", label: "Electrical room fire-rated, no storage, door latches" },
          { id: "address_visible", label: "Address numbers visible from street" }
        ],
        notesField: true
      },
      {
        id: "ada_exterior",
        title: "ADA Compliance & Exterior",
        type: "checklist",
        items: [
          { id: "accessible_parking", label: "Accessible parking - correct count, signage, van-accessible" },
          { id: "accessible_route", label: "Accessible route from parking to entrance OK" },
          { id: "accessible_entrance", label: "Accessible entrance identified with signage" },
          { id: "curb_ramps", label: "Curb ramps with detectable warning surface, proper slope" },
          { id: "checkout_accessible", label: "Checkout lanes include accessible aisle(s) (36\" min width)" },
          { id: "counter_lowered", label: "Customer service counter has lowered section (max 36\" AFF)" },
          { id: "tactile_signage", label: "Tactile/Braille signage at restrooms and permanent rooms" },
          { id: "exterior_facade", label: "Exterior facade, wall panels, joints, caulking OK" },
          { id: "exterior_signage", label: "Exterior signage condition, mounting, illumination OK" },
          { id: "parking_lot", label: "Parking lot surface free of potholes, striping visible" },
          { id: "cart_corrals", label: "Cart corrals in good condition and secured" },
          { id: "sidewalks", label: "Sidewalks free of cracks, heaving, or trip hazards" },
          { id: "dumpster_area", label: "Dumpster/compactor area enclosed, clean, accessible" },
          { id: "landscaping", label: "Landscaping not obstructing signage, lighting, or routes" }
        ],
        notesField: true
      },
      {
        id: "recommended_actions",
        title: "Recommended Actions",
        type: "checklist",
        items: [
          { id: "action_none", label: "No action needed - all items pass" },
          { id: "action_egress", label: "Egress/exit repair needed" },
          { id: "action_docks", label: "Loading dock repair needed" },
          { id: "action_racking", label: "Racking/shelving repair needed" },
          { id: "action_plumbing", label: "Plumbing repair needed" },
          { id: "action_electrical", label: "Electrical repair needed" },
          { id: "action_hvac", label: "HVAC/refrigeration service needed" },
          { id: "action_fire_safety", label: "Fire safety system service needed" },
          { id: "action_ada", label: "ADA compliance correction needed" },
          { id: "action_structural", label: "Structural repair needed" },
          { id: "action_other", label: "Other (see notes)" }
        ],
        extraFields: [
          {
            id: "building_type",
            type: "radio",
            label: "Building Type",
            options: ["Grocery Store", "Warehouse", "Distribution Center"]
          },
          {
            id: "priority",
            type: "radio",
            label: "Priority Level",
            options: ["Low", "Medium", "High", "Critical"]
          }
        ],
        notesField: true
      }
    ]
  }

};
