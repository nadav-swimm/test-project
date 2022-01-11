<template>
  <span
    :class="{
      'typography': true,
      'faded': faded,
      'emphasis': emphasis,
      'underline': underline,
      'nocursor': !selectable,
      'highlight': highlight,
      'block': block,
      'prominent': prominent,
      'error': error,
      'small': small,
      'normal': normal,
      'large': large,
      'larger': larger,
      'huge': huge,
      'code': code,
      'badge': badge,
      //
      'bold': bold,
      'bolder': bolder,
      'primary': primary,
      'secondary': secondary,
      'center': center,
      'hoverlink': hoverlink
    }"
    @click="onClick"
  >
    <slot />
  </span>
</template>

<script>

export default {
  props: {
    onClick: {
      type: Function,
      default: function () {}
    },
    title: {
      type: Boolean
    },
    badge: {
      type: Boolean
    },
    small: {
      type: Boolean
    },
    block: {
      type: Boolean
    },
    faded: {
      type: Boolean
    },
    hoverlink: {
      type: Boolean
    },
    normal: {
      type: Boolean
    },
    emphasis: {
      type: Boolean
    },
    prominent: {
      type: Boolean
    },
    underline: {
      type: Boolean
    },
    code: {
      type: Boolean
    },
    highlight: {
      type: Boolean
    },
    error: {
      type: Boolean
    },
    nocursor: {
      type: Boolean
    },
    selectable: {
      type: Boolean
    },
    large: {
      type: Boolean
    },
    larger: {
      type: Boolean
    },
    huge: {
      type: Boolean
    },
    bold: {
      type: Boolean
    },
    bolder: {
      type: Boolean
    },
    primary: {
      type: Boolean
    },
    secondary: {
      type: Boolean
    },
    center: {
      type: Boolean
    }
  }
}
</script>
<style lang="scss" scoped>
.typography {
  color: $text-color;
  font-size: 20px;
  font-family: $font;
  font-weight: 400;
}
.badge {
background: #e9e9e9;
    font-size: 11px;
    display: inline-block;
    padding: 2px 6px;
    border-radius: 40px;
}
.center {
  justify-content: center;
  text-align: center;
  display: flex;
}
.code {
  font-family: 'menlo', 'Monaco', 'Courier New', Courier, monospace;
}
.primary {
  color: $primary-text-color;
}
.prominent {
  color: $primary-color;
  font-size: 32px;
}
.block {
  display: block;
}
.hoverlink {
  cursor: pointer;
  &:hover {
    color: $primary-color;
  }
}
.secondary {
  color: $text-color;
}
.highlight {
  background-color: #eaf4ff;
}
.faded {
  color: #BFC6CF;
}
.emphasis {
  font-style: italic;
}
.underline {
  text-decoration: underline;
}
.nocursor {
  -webkit-touch-callout: none; /* iOS Safari */
      -webkit-user-select: none; /* Safari */
       -khtml-user-select: none; /* Konqueror HTML */
         -moz-user-select: none; /* Old versions of Firefox */
          -ms-user-select: none; /* Internet Explorer/Edge */
              user-select: none; /* Non-prefixed version, currentlyv */
}
.bold {
  font-weight: 600;
}
.bolder {
  font-weight: 700;
}

.error {
  color: $error-color;
}

.small {
  font-size: 16px;
  line-height: 20px;
}
.normal {
  font-size: 20px;
  line-height: 28px;
}

.large {
  font-size: 32px;
  line-height: 48px;
}

.larger {
  font-size: 40px;
  line-height: 60px;
}

.huge {
  font-size: 48px;
  line-height: 60px;
}

  @media only screen and (max-width: $mobile) {
      .huge {
        font-size: 32px;
        line-height: 48px;
      }

      .large {
        font-size: 16px;
        line-height: 24px;
      }

      .larger {
        font-size: 22px;
        line-height: 32px;
      }
      .normal {
        font-size: 16px;
        line-height: 20px;
      }
      .small {
          font-size: 14px !important;
          line-height: 20px;
        }

    }

@media only screen and (min-width: $mobile) and (max-width: $ipad) {
    .huge {
        font-size: 48px;
        line-height: 60px;
      }

      .large {
        font-size: 18px;
        line-height: 24px;
      }

      .larger {
        font-size: 24px;
        line-height: 32px;
      }
      .normal {
        font-size: 18px;
        line-height: 24px;
      }

}
</style>
